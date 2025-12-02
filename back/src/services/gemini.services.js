// importer l'outil de gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// importer la key API
const { env } = require('../config/env.js');

// initialisation du client Gemini
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// nom du modèle corrigé
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function horoscope() {
    const prompt = "c'est juste un test";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log(text);
}

module.exports = {
    horoscope
}
