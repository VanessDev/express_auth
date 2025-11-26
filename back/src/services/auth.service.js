const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/index.js");
const { env } = require("../config/env.js");

async function register({ email, password }) {
  // validation basique
  if (!email || !password) {
    const error = new Error("email et mdp obligatoire");
    error.status = 400;
    throw error;
  }

  // hash du mot de passe
  const hash = await bcrypt.hash(password, 10);

  // enregistrer l'utilisateur dans la db
  const query = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;
  const [result] = await pool.execute(query, [email, hash]);

  
  return {
    id: result.insertId,
    email,
    created_at: new Date(),
  };
}

module.exports = {
  register,
};
