// ================= IMPORT GROQ =================
const Groq = require("groq-sdk");         

// ================= CREATE INSTANCE =================
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

module.exports = groq;