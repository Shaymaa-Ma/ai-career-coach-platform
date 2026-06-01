
const groq = require("../config/groq");
const safeJSONParse = require("../utils/safeJSONParse");


// ================= AI Analysis =================
async function analyzeResume(text, major) {
  try {
    const prompt = `
You are a strict professional ATS recruiter AI.

Return ONLY valid JSON.

RULES:
- No hallucination
- Only extract skills that appear in resume
- No guessing
- Be consistent and realistic

SCORING RULES:
- 0–39 = weak or incomplete resume
- 40–59 = junior/student level
- 60–84 = good mid-level candidate
- 85–100 = strong senior/professional resume

OUTPUT:
{
  "role": string,
  "summary": string,
  "overallScore": number,
  "skills": [{"name": string, "score": number}],
  "gaps": string[],
  "recommendations": string[]
}

IMPORTANT:
- role must match actual detected job role
- skills must be real extracted skills only
- skill scores MUST be between 40 and 100
- beginner skills = 40-60
- intermediate skills = 60-79
- strong/professional skills = 80-100
- NEVER return single digit skill scores like 7 or 8
- gaps must reflect missing industry expectations or weak performance based on detected role
- recommendations must be actionable (not generic)

USER MAJOR:
${major}

RESUME:
${text.slice(0, 3500)}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    });

    const raw = response.choices[0].message.content;

    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = match ? safeJSONParse(match[0]) : null;

    const ai = parsed || {};

    return {
      role: ai.role || "unknown",
      summary: ai.summary || "",
      overallScore: Math.min(Number(ai.overallScore) || 0, 100),
      skills: Array.isArray(ai.skills)
        ? ai.skills.map(skill => ({
          name: skill.name || "Unknown",
          score: Math.min(
            Math.max(parseInt(skill.score) || 50, 40),
            100
          )
        }))
        : [],
      gaps: Array.isArray(ai.gaps) ? ai.gaps : [],
      recommendations: Array.isArray(ai.recommendations) ? ai.recommendations : []
    };

  } catch (err) {
    console.log("GROQ ERROR:", err.message);

    return {
      role: "unknown",
      summary: "AI temporarily unavailable",
      overallScore: 0,
      skills: [],
      gaps: [],
      recommendations: []
    };
  }
}

module.exports = analyzeResume;