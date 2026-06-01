const express = require("express");
const router = express.Router();

const db = require("../config/db");

const verifyToken = require("../middlewares/verifyToken");


//===================Dashboard Route====================
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // GET LATEST RESUME
    const latestResume = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT r.id AS resume_id,
               ra.role,
               ra.summary,
               ra.overall_score,
               r.created_at
        FROM resumes r
        JOIN resume_analysis ra ON r.id = ra.resume_id
        WHERE r.user_id = ?
        ORDER BY r.created_at DESC
        LIMIT 1
        `,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0]);
        }
      );
    });

    if (!latestResume) {
      return res.json({
        hasResume: false
      });
    }

    // GET SKILLS
    const skills = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT s.name, us.score
        FROM user_skills us
        JOIN skills s ON us.skill_id = s.id
        WHERE us.resume_id = ?
        ORDER BY us.score DESC
        `,
        [latestResume.resume_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    // GET GAPS
    const gaps = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT gap_text
        FROM resume_gaps
        WHERE resume_id = ?
        `,
        [latestResume.resume_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map(g => g.gap_text));
        }
      );
    });

    // GET RECOMMENDATIONS
    const recommendations = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT recommendation_text
        FROM resume_recommendations
        WHERE resume_id = ?
        `,
        [latestResume.resume_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map(r => r.recommendation_text));
        }
      );
    });

    res.json({
      hasResume: true,
      role: latestResume.role,
      summary: latestResume.summary,
      overallScore: latestResume.overall_score,
      createdAt: latestResume.created_at,
      skills,
      gaps,
      recommendations
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Dashboard fetch failed"
    });
  }
});

module.exports = router;
