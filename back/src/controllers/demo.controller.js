// src/controllers/demo.controller.js

// outil qu'on a créé pour se connecter à la BDD
const pool = require('../db/index');

// ✅ VERSION SÉCURISÉE (execute + paramètre ?)
async function searchUserSafe(req, res, next) {
  try {
    const { email } = req.query;
    console.log('get email (SAFE) :', email);

    const [rows] = await pool.execute(
      'SELECT id, email, created_at FROM users WHERE email = ?',
      [email]
    );

    console.log('result request (SAFE) :', rows);

    return res.json({
      message: 'requête avec execute (SAFE)',
      data: rows,
    });
  } catch (error) {
    console.log('erreur SAFE :', error);
    next(error);
  }
}

// ❌ VERSION NON SÉCURISÉE (pour la démo d’injection SQL)
async function searchUserUnsafe(req, res, next) {
  try {
    const { email } = req.query;
    console.log('get email (UNSAFE) :', email);

    // ⚠️ ATTENTION : ceci est volontairement dangereux
    const sql = `SELECT id, email, created_at FROM users WHERE email = '${email}'`;
    console.log('SQL UNSAFE :', sql);

    const [rows] = await pool.query(sql);

    return res.json({
      message: 'requête avec query (UNSAFE)',
      data: rows,
    });
  } catch (error) {
    console.log('erreur UNSAFE :', error);
    next(error);
  }
}

// ✅ Export en CommonJS
module.exports = {
  searchUserSafe,
  searchUserUnsafe,
};
