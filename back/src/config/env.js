// src/config/env.js

// On charge le .env UNE SEULE FOIS ici
require('dotenv').config();

const env = {
  PORT: process.env.PORT,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  JWT_SECRET: process.env.JWT_SECRET,
};

// Petit log pour débug (tu pourras le supprimer après)
console.log('ENV CHARGÉ :', env);

module.exports = { env };
