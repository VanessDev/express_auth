require("dotenv").config();

const app = require('./app');
const PORT = process.env.PORT;

const authRoutes = require("./routes/auth.routes");
const notFound = require("./middlewares/notFound");

// 1️⃣ routes d’auth
app.use('/monapi/auth', authRoutes);

// 2️⃣ 404 global, à la fin
app.use(notFound);

if (!PORT) {
  console.log("PORT absent, veuillez compléter le fichier .env");
  process.exit(1);
}

app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);