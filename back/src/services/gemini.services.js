// importer l'outil de gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// importer la key API
const { env } = require('../config/env.js');

// initialisation du client Gemini
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// nom du modèle corrigé
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function horoscope(data) {
    const prompt = "donne moi l'horoscope du jour (10 lignes max) pour quelqu'un qui est né le"+data+"sans reprendre ma question et en mettant en premiere ligne le signe astro de la personne";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
}



module.exports = {
    horoscope
}
