// notre outil de hashage de mdp
const bcrypt = require('bcrypt');
// notre outil de gestion des token
const jwt = require('jsonwebtoken');
// connexion à mysql
const pool = require('../db/index');
// mes variables d'environnement 
const { env } = require('../config/env.js');
//import des services
const { register } = require('../services/auth.service.js');

//  REGISTER 

const registerController = async (req, res) => {
  try {
    console.log('BODY RECU :', req.body);
    const { email, password } = req.body || {};

    // validation basique
    if (!email || !password) {
    const error = new Error('email et mdp obligatoire');
    error.status = 400;
    throw error;
    }

    // vérifier si l’email existe déjà
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà',
        data: null,
      });
    }

    // hash du mot de passe
    const hash = await bcrypt.hash(password, 10);

    // insertion en BDD
    const query = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    const [result] = await pool.query(query, [email, hash]);

    // réponse
    return res.status(201).json({
      success: true,
      message: 'Utilisateur enregistré',
      data: {
        id: result.insertId,
        email,
      },
    });
  } catch (error) {
    console.error('Erreur registerController :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      data: null,
    });
  }
};

//  LOGIN 

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    // validation rapide
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Les champs 'email' et 'password' sont obligatoires",
        data: null,
      });
    }

    

    // récupérer l’utilisateur en BDD
    const [rows] = await pool.query(
      'SELECT id, email, password_hash, role FROM users WHERE email = ?',
      [email]
    );

  

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
        data: null,
      });
    }

    const user = rows[0];

    // comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
        data: null,
      });
    }

  

    // génération du token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET, // assure-toi que JWT_SECRET est défini dans ton .env
      { expiresIn: '1h' }
    );
    

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      data: null,
    });
  }
};

// PROFILE 

const profileController = async (req, res) => {
  console.log(req.user);
    res.json({user: req.user});
};

module.exports = {
  registerController,
  loginController,
  profileController,
};
