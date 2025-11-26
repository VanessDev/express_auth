// src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const { env } = require('../config/env.js');
const pool = require('../db/index.js'); // ✅ pas de { pool }

// middleware d'auth
async function authenticate(req, res, next) {
  try {
    // récupère le token
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: 'pas de token' });
    }

    const token = authorization.replace('Bearer ', '');

    // vérifie le token
    const payload = jwt.verify(token, env.JWT_SECRET);

    // optionnel : récupérer l’utilisateur en BDD
    const [rows] = await pool.query(
      'SELECT id, email, created_at FROM users WHERE id = ?',
      [payload.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'user inexistant' });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Erreur auth middleware :', error);
    return res.status(401).json({ error: 'token invalide' });
  }
}

module.exports = { authenticate };
