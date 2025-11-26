const app = require('./app');
const { env } = require('./config/env.js');

// On récupère le port (fallback à 4000)
const PORT = env.PORT || 4000;

// Vérifie que le port existe
if (!PORT) {
  console.log('❌ PORT absent, veuillez compléter le fichier .env');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
