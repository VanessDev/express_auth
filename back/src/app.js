const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// importe tes routes
const authRoutes = require('./routes/auth.routes.js');
const demoRoutes = require('./routes/demo.routes.js');
const profileRoutes = require('./routes/profile.routes.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// petite route de test
app.get('/test', (req, res) => {
  console.log('route de test ok');
  res.send('route de test ok');
});

// ====== ROUTES ======

// routes d'authentification → /api/auth/...
app.use('/api/auth', authRoutes);

// routes démo /api/demo/...
app.use('/api/demo', demoRoutes);

// route du profil / liste d'utilisateurs → /api/profile/...
app.use('/api/profile', profileRoutes);



// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || 'erreur serveur',
  });
});

module.exports = app;
