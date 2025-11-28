// récupère l'URL de l'API définie dans le fichier d'environnement
// .env.local → VITE_API_URL="http://localhost:4000"
const API_URL = import.meta.env.VITE_API_URL;

// ======================
// logique d'inscription
// ======================
export async function register(email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // on récupère un éventuel message d'erreur renvoyé par le back
    const message =
      (data && (data.error || data.Error)) || "Inscription a échoué";
    throw new Error(message);
  }

  return data;
}

// ======================
// logique de connexion
// ======================
export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data && (data.error || data.Error)) || "Echec de la connexion";
    throw new Error(message);
  }

  return data;
}

// ======================
// récupération du profil
// ======================
// ⚠️ ici je remets TON URL ORIGINALE pour ne rien casser côté back
// /api/auth/profil (si plus tard tu veux utiliser /api/profile, on l’adaptera)
export async function getProfil(token) {

  const response = await fetch(`${API_URL}/api/auth/profil`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // format Bearer <token>
    },
  });

  const data = await response.json();

  

  if (!response.ok) {
    const message =
      (data && (data.error || data.Error)) ||
      "erreur lors de la récupération du profil";
    throw new Error(message);
  }

  return data;
}
