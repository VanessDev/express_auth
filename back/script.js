import { testConnection, pool } from "./src/db/index.js";

try {
  await testConnection();
  await pool.end();
  console.log("tout est prêt pour lancer le serveur");
  process.exit(0);
} catch (error) {
  console.error("co impossible", error);
  process.exit(1);
}


// 0 succes  1 erreur