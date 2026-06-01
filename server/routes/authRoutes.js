// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middlewares/verifyToken");

// ================= Auth Part =================
// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, major, education, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    email = email.toLowerCase().trim();

    db.query("SELECT id FROM users WHERE email = ?", [email], async (err, existing) => {
      if (existing.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password, major, education, bio) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hash, major || "", education || "", bio || ""],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
          }

          const userId = result.insertId;

          const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET || "dev_secret",
            { expiresIn: "7d" }
          );

          return res.json({
            token,
            user: {
              id: userId,
              name,
              email,
              major,
              education,
              bio
            }
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  email = email.toLowerCase().trim();

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (!result || result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        major: user.major || "",
        education: user.education || "",
        bio: user.bio || ""
      }
    });
  });
});

// ================= PROFILE GET =================
router.get("/profile", verifyToken, (req, res) => {
  db.query(
    "SELECT id, name, email, major, education, bio FROM users WHERE id = ?",
    [req.userId],
    (err, result) => {
      if (err || !result.length) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: result[0] });
    }
  );
});

// ================= PROFILE UPDATE =================
router.put("/profile", verifyToken, (req, res) => {
  const { name, major, education, bio } = req.body;

  db.query(
    `UPDATE users SET name=?, major=?, education=?, bio=? WHERE id=?`,
    [name, major, education, bio, req.userId],
    (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });

      db.query(
        "SELECT id, name, email, major, education, bio FROM users WHERE id=?",
        [req.userId],
        (err, result) => {
          res.json({ user: result[0] });
        }
      );
    }
  );
});

module.exports = router;