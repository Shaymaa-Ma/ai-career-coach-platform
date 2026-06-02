const express = require("express");
const router = express.Router();

const db = require("../config/db");
const verifyToken = require("../middlewares/verifyToken");
const generateRoadmapAI = require("../services/generateRoadmapAI");


// GENERATE ROADMAP
router.post("/roadmap/generate", verifyToken, async (req, res) => {

  try {

    const userId = req.userId;

    // ================= DELETE OLD ROADMAP =================

    await new Promise((resolve, reject) => {

      db.query(
        `DELETE FROM learning_roadmaps WHERE user_id=?`,
        [userId],
        (err) => err ? reject(err) : resolve()
      );

    });

    // ================= LOAD ANALYSIS =================

    const analysis = await new Promise((resolve, reject) => {

      db.query(
        `
        SELECT ra.role, r.id AS resume_id
        FROM resume_analysis ra
        JOIN resumes r ON ra.resume_id = r.id
        WHERE r.user_id=?
        ORDER BY ra.created_at DESC
        LIMIT 1
        `,
        [userId],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows[0]);

        }
      );

    });

    if (!analysis) {
      return res.status(400).json({
        error: "Upload resume first"
      });
    }

    // ================= LOAD GAPS =================

    const gaps = await new Promise((resolve, reject) => {

      db.query(
        `
        SELECT gap_text
        FROM resume_gaps
        WHERE resume_id=?
        `,
        [analysis.resume_id],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows.map(r => r.gap_text));

        }
      );

    });

    // ================= LOAD RECOMMENDATIONS =================

    const recommendations = await new Promise((resolve, reject) => {

      db.query(
        `
        SELECT recommendation_text
        FROM resume_recommendations
        WHERE resume_id=?
        `,
        [analysis.resume_id],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows.map(r => r.recommendation_text));

        }
      );

    });

    // ================= LOAD USER =================

    const user = await new Promise((resolve, reject) => {

      db.query(
        `SELECT major FROM users WHERE id=?`,
        [userId],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows[0]);

        }
      );

    });

    // ================= AI =================

    const roadmap = await generateRoadmapAI(
      analysis.role,
      gaps,
      recommendations,
      user?.major || ""
    );

    // ================= CALCULATE TOTAL STEPS =================

    let totalSteps = 0;

    roadmap.weeks?.forEach((week) => {
      totalSteps += week.steps?.length || 0;
    });

    // ================= INSERT ROADMAP =================

    const roadmapId = await new Promise((resolve, reject) => {

      db.query(
        `
        INSERT INTO learning_roadmaps
        (
          user_id,
          role,
          title,
          progress,
          estimated_duration,
          total_steps,
          completed_steps
        )
        VALUES (?, ?, ?, 0, ?, ?, 0)
        `,
        [
          userId,
          analysis.role,
          roadmap.title,
          `${roadmap.weeks?.length || 4} Weeks`,
          totalSteps
        ],
        (err, result) => {

          if (err) reject(err);
          else resolve(result.insertId);

        }
      );

    });

    // ================= INSERT WEEKS + STEPS =================

    for (let w = 0; w < roadmap.weeks.length; w++) {

      const week = roadmap.weeks[w];

      const weekId = await new Promise((resolve, reject) => {

        db.query(
          `
          INSERT INTO roadmap_weeks
          (
            roadmap_id,
            week_number,
            title,
            focus,
            unlocked
          )
          VALUES (?, ?, ?, ?, ?)
          `,
          [
            roadmapId,
            week.week,
            week.title,
            week.focus,
            w === 0
          ],
          (err, result) => {

            if (err) reject(err);
            else resolve(result.insertId);

          }
        );

      });

      for (let i = 0; i < week.steps.length; i++) {

        const step = week.steps[i];

        await new Promise((resolve, reject) => {

          db.query(
            `
            INSERT INTO roadmap_steps
            (
              roadmap_id,
              week_id,
              skill_name,
              level,
              description,
              resource_title,
              resource_type,
              resource_url,
              estimated_time,
              completed,
              step_order
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
            `,
            [
              roadmapId,
              weekId,
              step.skill,
              step.level,
              step.description,
              step.resource?.title || null,
              step.resource?.type || "video",
              step.resource?.searchQuery || null,
              step.estimatedTime,
              i + 1
            ],
            (err) => {

              if (err) reject(err);
              else resolve();

            }
          );

        });

      }

    }

    res.json({
      success: true,
      roadmapId
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Roadmap generation failed"
    });

  }

});



// LATEST ROADMAP
router.get("/roadmap/latest", verifyToken, (req, res) => {

  db.query(
    `
    SELECT id
    FROM learning_roadmaps
    WHERE user_id=?
    ORDER BY id DESC
    LIMIT 1
    `,
    [req.userId],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: "DB error"
        });
      }

      res.json(rows[0] || null);

    }
  );

});



// GET ROADMAP
router.get("/roadmap/:id", verifyToken, async (req, res) => {

  try {

    const roadmapId = req.params.id;

    const roadmapRows = await new Promise((resolve, reject) => {

      db.query(
        `
        SELECT *
        FROM learning_roadmaps
        WHERE id=? AND user_id=?
        `,
        [roadmapId, req.userId],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows);

        }
      );

    });

    if (!roadmapRows[0]) {
      return res.status(404).json({
        error: "Roadmap not found"
      });
    }

    const roadmap = roadmapRows[0];

    const weeks = await new Promise((resolve, reject) => {

      db.query(
        `
        SELECT *
        FROM roadmap_weeks
        WHERE roadmap_id=?
        ORDER BY week_number
        `,
        [roadmapId],
        (err, rows) => {

          if (err) reject(err);
          else resolve(rows);

        }
      );

    });

    for (const week of weeks) {

      const steps = await new Promise((resolve, reject) => {

        db.query(
          `
          SELECT *
          FROM roadmap_steps
          WHERE week_id=?
          ORDER BY step_order
          `,
          [week.id],
          (err, rows) => {

            if (err) reject(err);
            else resolve(rows);

          }
        );

      });

      week.steps = steps;

    }

    res.json({
      ...roadmap,
      weeks
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to load roadmap"
    });

  }

});




// ================= UPDATE STEP =================
router.put("/roadmap/step/:id", verifyToken, async (req, res) => {
  try {
    const stepId = req.params.id;
    const { completed } = req.body;

    // ================= UPDATE STEP =================
    await new Promise((resolve, reject) => {
      db.query(
        `
        UPDATE roadmap_steps
        SET
          completed=?,
          completed_at=?
        WHERE id=?
        `,
        [completed, completed ? new Date() : null, stepId],
        (err) => (err ? reject(err) : resolve())
      );
    });

    // ================= GET STEP =================
    const step = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT rs.*, rw.roadmap_id
        FROM roadmap_steps rs
        JOIN roadmap_weeks rw ON rs.week_id = rw.id
        WHERE rs.id=? AND rw.roadmap_id IN (
          SELECT id FROM learning_roadmaps WHERE user_id=?
        )
        `,
        [stepId, req.userId],
        (err, rows) => (err ? reject(err) : resolve(rows[0]))
      );
    });

    if (!step) {
      return res.status(404).json({ error: "Step not found" });
    }

    // ================= GET ALL WEEKS =================
    const weeks = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT *
        FROM roadmap_weeks
        WHERE roadmap_id=?
        ORDER BY week_number ASC
        `,
        [step.roadmap_id],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

    // attach steps to each week
    for (const week of weeks) {
      week.steps = await new Promise((resolve, reject) => {
        db.query(
          `
          SELECT *
          FROM roadmap_steps
          WHERE week_id=?
          `,
          [week.id],
          (err, rows) => (err ? reject(err) : resolve(rows))
        );
      });
    }

    // ================= REBUILD WEEK LOGIC =================
    let previousUnlocked = true;

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];

      // check completion
      const isCompleted =
        week.steps.length > 0 &&
        week.steps.every((s) => Number(s.completed) === 1);

      // update completion status
      await new Promise((resolve, reject) => {
        db.query(
          `
          UPDATE roadmap_weeks
          SET completed=?
          WHERE id=?
          `,
          [isCompleted ? 1 : 0, week.id],
          (err) => (err ? reject(err) : resolve())
        );
      });

      // unlock logic (CHAIN RULE)
      const shouldBeUnlocked = previousUnlocked;

      await new Promise((resolve, reject) => {
        db.query(
          `
          UPDATE roadmap_weeks
          SET unlocked=?
          WHERE id=?
          `,
          [shouldBeUnlocked ? 1 : 0, week.id],
          (err) => (err ? reject(err) : resolve())
        );
      });

      // next week depends on this one
      previousUnlocked = isCompleted;
    }

    // ================= UPDATE PROGRESS =================
    const stats = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT
          COUNT(*) AS total,
          SUM(completed=1) AS completed
        FROM roadmap_steps
        WHERE roadmap_id=?
        `,
        [step.roadmap_id],
        (err, rows) => (err ? reject(err) : resolve(rows[0]))
      );
    });

    const progress = Math.round(
      ((stats.completed || 0) / stats.total) * 100
    );

    await new Promise((resolve, reject) => {
      db.query(
        `
        UPDATE learning_roadmaps
        SET
          progress=?,
          completed_steps=?
        WHERE id=?
        `,
        [progress, stats.completed || 0, step.roadmap_id],
        (err) => (err ? reject(err) : resolve())
      );
    });

    res.json({
      success: true,
      progress,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to update step",
    });
  }
});




// RESUME CHECK
router.get("/resume/my-resume", verifyToken, (req, res) => {

  db.query(
    `
    SELECT *
    FROM resumes
    WHERE user_id=?
    ORDER BY id DESC
    LIMIT 1
    `,
    [req.userId],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: "DB error"
        });
      }

      res.json(rows[0] || null);

    }
  );

});

module.exports = router;