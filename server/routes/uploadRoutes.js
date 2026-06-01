const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../config/db");
const verifyToken = require("../middlewares/verifyToken");
const extractText = require("../utils/extractText");
const hashText = require("../utils/hashText");
const validateResume = require("../utils/validateResume");
const analyzeResume = require("../services/analyzeResume");


// ================= UPLOAD =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ================= UPLOAD ROUTE =================
router.post("/upload", verifyToken, upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const userId = req.userId;

    const ext = req.file.originalname.split(".").pop().toLowerCase();

    // FILE TYPE VALIDATION
    if (!["pdf", "doc", "docx"].includes(ext)) {
      return res.status(400).json({
        error: "Only PDF or DOCX files are allowed."
      });
    }

    // 1. Get user major
    const user = await new Promise((resolve, reject) => {
      db.query("SELECT major FROM users WHERE id=?", [userId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });

    const major = user?.major || "";

    // 2. Extract text
    const text = await extractText(filePath);

    // CONTENT VALIDATION
    const validationError = validateResume(text);

    if (validationError) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) { }

      return res.status(400).json({
        error: validationError,
        rejected: true,
        reasonCode: "VALIDATION_FAILED"
      });
    }

    // HASH FOR CONSISTENCY
    const contentHash = hashText(text);

    // CHECK IF SAME RESUME ALREADY EXISTS
    const existing = await new Promise((resolve, reject) => {
      db.query(
        "SELECT r.id, a.role, a.summary, a.overall_score FROM resumes r JOIN resume_analysis a ON r.id = a.resume_id WHERE r.content_hash=?",
        [contentHash],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0]);
        }
      );
    });

    if (existing) {
      const skills = await new Promise((resolve, reject) => {
        db.query(
          `SELECT s.name, us.score
       FROM user_skills us
       JOIN skills s ON us.skill_id = s.id
       WHERE us.resume_id=?`,
          [existing.id],
          (err, rows) => (err ? reject(err) : resolve(rows))
        );
      });

      return res.json({
        role: existing.role || "unknown",
        summary: existing.summary || "",
        overallScore: existing.overall_score || 0,
        skills: skills || [],
        gaps: ["Previously analyzed resume (cached result)"],
        recommendations: ["Improve achievements and measurable impact"]
      });
    }

    // 3. Save resume
    const resumeId = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO resumes (user_id, file_url, extracted_text, is_valid_resume, content_hash) VALUES (?, ?, ?, ?, ?)",
        [userId, filePath, text, true, contentHash],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        }
      );
    });

    // 4. AI
    const ai = await analyzeResume(text, major);

    // 5. Save analysis
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO resume_analysis (resume_id, role, summary, overall_score) VALUES (?, ?, ?, ?)",
        [resumeId, ai.role, ai.summary, ai.overallScore],
        (err) => (err ? reject(err) : resolve())
      );
    });

    //6.Save Gaps
    for (const gap of ai.gaps) {
      await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO resume_gaps (resume_id, gap_text) VALUES (?, ?)",
          [resumeId, gap],
          (err) => (err ? reject(err) : resolve())
        );
      });
    }
    //7.Save Recommendations
    for (const rec of ai.recommendations) {
      await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO resume_recommendations (resume_id, recommendation_text) VALUES (?, ?)",
          [resumeId, rec],
          (err) => (err ? reject(err) : resolve())
        );
      });
    }

    // 8. Save skills
    for (const skill of ai.skills) {
      const name = skill.name.toLowerCase().trim();

      await new Promise((resolve, reject) => {
        db.query("INSERT IGNORE INTO skills (name) VALUES (?)", [name], (err) => {
          if (err) return reject(err);

          db.query("SELECT id FROM skills WHERE name=?", [name], (err, rows) => {
            if (err) return reject(err);

            const skillId = rows[0].id;

            db.query(
              "INSERT INTO user_skills (user_id, skill_id, resume_id, score) VALUES (?, ?, ?, ?)",
              [userId, skillId, resumeId, skill.score],
              (err) => (err ? reject(err) : resolve())
            );
          });
        });
      });
    }

    // CLEANUP: Delete temp file after processing
    try {
      fs.unlinkSync(filePath);
      console.log("Temp file cleaned:", filePath);
    } catch (cleanupErr) {
      console.warn("File cleanup failed (ok):", cleanupErr.message);
    }

    res.json(ai);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;