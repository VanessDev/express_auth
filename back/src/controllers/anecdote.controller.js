require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAnecdote = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
    Donne-moi une anecdote courte, drôle et familiale.
    Style: humour léger, 1 à 2 phrases max.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      anecdote: text,
      date: new Date().toLocaleDateString(),
    });
  } catch (error) {
    console.error("Erreur Gemini :", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la génération de l’anecdote",
    });
  }
};
