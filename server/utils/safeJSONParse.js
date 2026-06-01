// ================= SAFE AI PARSER =================
function safeJSONParse(text) {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("JSON parse failed:", e);
  }

  return {
    role: "unknown",
    summary: "AI response parse failed",
    overallScore: 0,
    skills: [],
    gaps: [],
    recommendations: []
  };
}

module.exports = safeJSONParse;