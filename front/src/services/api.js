// récupère l'URL de l'API définie dans le fichier d'environnement
// .env.local → VITE_API_URL="http://localhost:4000"
const API_URL = import.meta.env.VITE_API_URL;

// ======================
// logique d'inscription
// ======================
export async function register(email, password, birthday, birthcity) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  
    body: JSON.stringify({ email, password, birthday, birthcity }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.error || data.Error || data.message)) ||
      "Inscription a échoué";
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

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.error || data.Error || data.message)) ||
      "Echec de la connexion";
    throw new Error(message);
  }

  return data;
}

// ======================
// récupération du profil
// ======================
export async function getProfil(token) {
  const response = await fetch(`${API_URL}/api/auth/profil`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // format Bearer <token>
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.error || data.Error || data.message)) ||
      "erreur lors de la récupération du profil";
    throw new Error(message);
  }

  return data;
}
