const express = require("express");
const router = express.Router();

const groq = require("../config/groq");
const verifyToken = require("../middlewares/verifyToken");
const generateInterview = require("../services/generateInterview");
const dbQuery = require("../utils/dbQuery");

const normalizeScore = (value) => {
  let num = Number(value);

  if (isNaN(num)) return 5;

  if (num < 0) num = 0;
  if (num > 10) num = 10;

  return Math.round(num);
};


// ================= START INTERVIEW =================
router.post("/interview/start", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      personality = "strict",
      language = "English",
      country = "United States",
      interviewType = "mixed"
    } = req.body;

    // ================= GET ROLE =================
    const analysis = await dbQuery(`
      SELECT ra.role
      FROM resume_analysis ra
      JOIN resumes r ON ra.resume_id = r.id
      WHERE r.user_id=?
      ORDER BY r.created_at DESC
      LIMIT 1
    `, [userId]) || [];

    const role = analysis?.[0]?.role || "Software Engineer";

    // ================= USER MAJOR =================
    const user = await dbQuery(
      "SELECT major FROM users WHERE id=?",
      [userId]
    ) || [];

    // ================= SKILLS =================
    const skillsRows = await dbQuery(`
      SELECT s.name
      FROM user_skills us
      JOIN skills s ON us.skill_id = s.id
      WHERE us.user_id=?
    `, [userId]) || [];

    const skills = skillsRows.map(s => s.name).filter(Boolean);

    // ================= GAPS (FIXED COLUMN NAME) =================
    const gapsRows = await dbQuery(`
      SELECT gap_text
      FROM resume_gaps
      WHERE resume_id IN (
        SELECT id FROM resumes WHERE user_id=?
      )
      LIMIT 10
    `, [userId]) || [];

    const gaps = gapsRows.map(g => g.gap_text).filter(Boolean);

    // ================= RECOMMENDATIONS (FIXED TABLE) =================
    const recRows = await dbQuery(`
      SELECT recommendation_text
      FROM resume_recommendations
      WHERE resume_id IN (
        SELECT id FROM resumes WHERE user_id=?
      )
      LIMIT 20
    `, [userId]) || [];

    const recommendations = recRows.map(r => r.recommendation_text);

    console.log("DEBUG START:", {
      role,
      skills,
      gaps,
      recommendations
    });

    // ================= AI =================
    const ai = await generateInterview(
      role,
      skills,
      gaps,
      user?.[0]?.major || "Computer Science",
      personality,
      language,
      country,
      interviewType,
      recommendations
    );

    if (!ai?.questions?.length) {
      return res.status(500).json({
        error: "AI returned empty questions"
      });
    }

    // ================= CREATE SESSION =================
    const sessionResult = await dbQuery(`
      INSERT INTO interview_sessions
      (user_id, role, level, personality, total_questions, language, country, interview_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      ai.role,
      ai.level,
      personality,
      ai.questions.length,
      language,
      country,
      interviewType
    ]);

    // ================= FIX insertId SAFELY =================
    const sessionId =
      sessionResult?.insertId ||
      sessionResult?.[0]?.insertId;

    if (!sessionId) {
      throw new Error("Session creation failed (no insertId)");
    }

    // ================= SAVE QUESTIONS =================
    for (let i = 0; i < ai.questions.length; i++) {
      const q = ai.questions[i];

      await dbQuery(`
        INSERT INTO interview_questions
        (session_id, question, type, difficulty, time_limit, step_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        sessionId,
        q.question || "No question",
        q.type || "technical",
        q.difficulty || "easy",
        q.timeLimit || 60,
        i + 1
      ]);
    }

    return res.json({
      sessionId,
      ...ai
    });

  } catch (err) {
    console.error("START INTERVIEW ERROR:", err);

    return res.status(500).json({
      error: "Interview start failed",
      details: err.message
    });
  }
});



// ================= ANSWER EVALUATION =================
router.post("/interview/answer", verifyToken, async (req, res) => {
  const { questionId, answer } = req.body;

  try {
    const question = await dbQuery(
      "SELECT * FROM interview_questions WHERE id=?",
      [questionId]
    );

    if (!question.length) {
      return res.status(404).json({ error: "Question not found" });
    }

    // ================= EVALUATION PROMPT =================
    const prompt = `
You are an expert interview evaluator.

Evaluate the answer strictly and fairly.

QUESTION:
${question[0].question}

ANSWER:
${answer}

Return ONLY valid JSON:

{
  "score": number (0-10),
  "feedback": string,
  "improvedAnswer": string,
  "confidence": number (0-10),
  "consistency": number (0-10),
  "weakness": string
}

SCORING RULES:
- 0 = no answer / irrelevant
- 1-3 = very weak answer
- 4-6 = partial understanding
- 7-8 = good structured answer
- 9-10 = excellent professional answer

CONFIDENCE RULES:
- How sure the candidate sounds

CONSISTENCY RULES:
- Logical flow, clarity, no contradictions

IMPORTANT:
- No markdown
- No explanation
- Only JSON
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    const raw = response.choices?.[0]?.message?.content || "";
    const match = raw.match(/\{[\s\S]*\}/);

    let ai;

    try {
      ai = match ? JSON.parse(match[0]) : null;
    } catch (e) {
      ai = null;
    }

    // ================= SAFE NORMALIZATION =================
    const finalAI = {
      score: normalizeScore(ai?.score),
      feedback: ai?.feedback || "No feedback provided",
      improvedAnswer: ai?.improvedAnswer || "",
      confidence: normalizeScore(ai?.confidence),
      consistency: normalizeScore(ai?.consistency),
      weakness: ai?.weakness || ""
    };

    // ================= OPTIONAL: OVERALL QUALITY =================
    finalAI.overallQuality = Math.round(
      (finalAI.score + finalAI.confidence + finalAI.consistency) / 3
    );

    // ================= SAVE TO DB =================
    await dbQuery(`
      INSERT INTO interview_answers
      (question_id, answer, score, feedback, improved_answer, confidence, consistency)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      questionId,
      answer,
      finalAI.score,
      finalAI.feedback,
      finalAI.improvedAnswer,
      finalAI.confidence,
      finalAI.consistency
    ]);

    return res.json(finalAI);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Evaluation failed"
    });
  }
});



// ================= GET QUESTIONS =================
router.get("/interview/:id/questions", verifyToken, async (req, res) => {

  try {

    const rows = await dbQuery(`
      SELECT *
      FROM interview_questions
      WHERE session_id=?
      ORDER BY step_order ASC
    `, [req.params.id]);

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
});

// ================= SAVE PROGRESS =================
router.post("/interview/:id/progress", verifyToken, async (req, res) => {
  try {
    const sessionId = req.params.id;
    const userId = req.userId;
    const { index, answer } = req.body;

    await dbQuery(
      `
      INSERT INTO interview_progress (session_id, user_id, current_index, current_answer)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        current_index = VALUES(current_index),
        current_answer = VALUES(current_answer)
      `,
      [sessionId, userId, index, answer]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save progress" });
  }
});


// ================= GET PROGRESS =================
router.get("/interview/:id/progress", verifyToken, async (req, res) => {
  try {
    const sessionId = req.params.id;
    const userId = req.userId;

    const rows = await dbQuery(
      `
      SELECT * FROM interview_progress
      WHERE session_id=? AND user_id=?
      LIMIT 1
      `,
      [sessionId, userId]
    );

    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: "Failed to load progress" });
  }
});



// ================= FINAL REPORT =================
router.get("/interview/:id/report", verifyToken, async (req, res) => {
  try {
    const sessionId = req.params.id;

    // ================= GET AVERAGE SCORE =================
    const data = await dbQuery(`
      SELECT COALESCE(AVG(score), 0) as score
      FROM interview_answers ia
      JOIN interview_questions iq
      ON ia.question_id = iq.id
      WHERE iq.session_id = ?
    `, [sessionId]);

    const rawScore = data?.[0]?.score ?? 0;

    const score = Math.max(0, Math.min(10, Math.round(Number(rawScore) || 0)));

    // ================= AI INSIGHT (SAFE) =================
    let insightText = "";

    try {
      const aiInsight = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an expert interview coach.

Give short professional feedback for a candidate with score ${score}/10.

Return ONLY plain text (no JSON, no markdown).
            `
          }
        ],
        temperature: 0.4
      });

      insightText =
        aiInsight?.choices?.[0]?.message?.content?.trim() ||
        "No insight available.";
    } catch (err) {
      console.log("Insight generation failed:", err);
      insightText = "Insight temporarily unavailable.";
    }

    // ================= LEVEL =================
    const level =
      score >= 8 ? "Senior" :
        score >= 6 ? "Mid" : "Junior";

    // ================= HIRE PROBABILITY =================
    const hireProbability =
      score >= 8 ? "Very High 🟢" :
        score >= 6 ? "Good 🟡" :
          "Needs Improvement 🔴";

    // ================= RESPONSE =================
    return res.json({
      overallScore: score,
      level,
      hireProbability,
      insight: insightText
    });

  } catch (err) {
    console.log("Report failed:", err);

    return res.status(500).json({
      error: "Report failed",
      details: err.message
    });
  }
});

module.exports = router;