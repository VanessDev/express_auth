const express = require('express');   // Importe le framework Express
const cors = require('cors');         // Importe le middleware CORS
const morgan = require('morgan');     // Importe le logger HTTP Morgan
const authRoutes = require('./routes/auth.routes.js'); // importe tes routes

const app = express();           // Crée l'application Express

app.use(cors());                 // Active CORS pour accepter les requêtes externes
// CORS sert à autoriser ou bloquer les requêtes HTTP entre deux origines différentes.
app.use(express.json());         // Active le parsing JSON du corps des requêtes
app.use(morgan('dev'));          // Active le logger pour chaque requête

// petite route de test
app.get('/test', (req, res) => {
  console.log('route de test ok');
  res.send('route de test ok');
});

// route parent pour auth
app.use('/api/auth', authRoutes);

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err); // log complet de l’erreur dans la console

  res.status(err.status || 500).json({
    error: err.message || 'erreur serveur',
  });
});

module.exports = app;   // <--- IMPORTANT : on exporte l'instance Express
