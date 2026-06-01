const express = require("express");
const router = express.Router();

const db = require("../config/db");

const verifyTokenOptional = require("../middlewares/verifyTokenOptional");


// ================= CONTACT =================
router.post("/contact", verifyTokenOptional, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    let userId = req.userId || null;
    let finalEmail = email;

    //  If user is logged in → override email from DB
    if (userId) {
      const user = await new Promise((resolve, reject) => {
        db.query(
          "SELECT email FROM users WHERE id=?",
          [userId],
          (err, r) => (err ? reject(err) : resolve(r[0]))
        );
      });

      if (user?.email) {
        finalEmail = user.email;
      }
    }

    db.query(
      `INSERT INTO ContactMessages (user_id, name, email, message)
       VALUES (?, ?, ?, ?)`,
      [userId, name, finalEmail, message],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ success: true });
      }
    );

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;