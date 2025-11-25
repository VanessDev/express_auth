//grâce à dotenv 
require('dotenv').config();

//on recupere les informations de mon fichier .env


module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },

   
    define: {
      underscored: false, 
    },
  },
};