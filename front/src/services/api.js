//recupere l'URL de l'api defini dans le ficher d'environnement
const API_URL = import.meta.env.VITE_API_URL;

//logique d'inscritpion
export async function register (email,password) {
    //faire la request POST sur la route api/auth/register
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        //passer les datas au body
        body: JSON.stringify({email,password}),
    });
    //parse la response json
    const data = await response.json();

    //petite gestion d'erreur
    if(!response.ok){
        throw new Error(data.Error || 'Inscription a echoué');
    }
    return data;
}

// logique de connexion

export async function login(email,password) {
    //faire la request post sur la route api/auth/login
    const response = await fetch (`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({email,password}),
    });
    const data = await response.json();
       if(!response.ok){
        throw new Error(data.Error || 'Echec de la connexion');
    }
    return data;
}

export async function getProfil(token) {
    //prepare la requete get sur la route api/auth/profil
    //pour les routes qui necessitent une connexion, on doit passer le token dans le header

    const response = await fetch (`${API_URL}/api/auth/profil`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //passer le token dans le format qui est attendu par l'api
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error || 'erreur lors de la recuperation du profil')
    }
    return data;
}
