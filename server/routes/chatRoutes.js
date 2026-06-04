const express = require("express");
const router = express.Router();

const db = require("../config/db");
const generateAIChatbot = require("../services/aiChatbot");

const verifyToken = require("../middlewares/verifyToken");
const verifyTokenOptional = require("../middlewares/verifyTokenOptional");

// ================= CREATE SESSION =================
router.post("/chat/session", verifyToken, (req, res) => {
    const { title } = req.body;

    db.query(
        "INSERT INTO ChatSessions (user_id, title) VALUES (?, ?)",
        [req.userId, title || "New Chat"],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({
                sessionId: result.insertId,
                title: title || "New Chat"
            });
        }
    );
});

// ================= GET SESSIONS =================
router.get("/chat/sessions", verifyToken, (req, res) => {
    db.query(
        "SELECT * FROM ChatSessions WHERE user_id=? ORDER BY created_at DESC",
        [req.userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// ================= RENAME SESSION =================
router.put("/chat/session/:id", verifyToken, (req, res) => {
    const { title } = req.body;

    db.query(
        "UPDATE ChatSessions SET title=? WHERE id=? AND user_id=?",
        [title, req.params.id, req.userId],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

// ================= DELETE SESSION =================
router.delete("/chat/session/:id", verifyToken, (req, res) => {
    db.query(
        "DELETE FROM ChatSessions WHERE id=? AND user_id=?",
        [req.params.id, req.userId],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

// ================= GET MESSAGES =================
router.get("/chat/messages/:sessionId", verifyToken, (req, res) => {
    const sessionId = req.params.sessionId;

    db.query(
        "SELECT * FROM ChatSessions WHERE id=? AND user_id=?",
        [sessionId, req.userId],
        (err, session) => {
            if (err) return res.status(500).json(err);
            if (!session.length) return res.status(403).json({ error: "Unauthorized" });

            db.query(
                "SELECT * FROM Messages WHERE session_id=? ORDER BY timestamp ASC",
                [sessionId],
                (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.json(result);
                }
            );
        }
    );
});

// ================= SEND MESSAGE =================
router.post("/chat/send", verifyTokenOptional, async (req, res) => {

    const { sessionId, message } = req.body;

    try {
        const userId = req.userId || null;

        let major = "";

        // ================= GET USER MAJOR =================
        if (userId) {
            const user = await new Promise((resolve, reject) => {
                db.query(
                    "SELECT major FROM users WHERE id=?",
                    [userId],
                    (err, r) => (err ? reject(err) : resolve(r[0]))
                );
            });

            major = user?.major || "";
        }

        // ================= SAVE USER MESSAGE =================
        if (userId && sessionId) {
            await new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO Messages (session_id, sender, message) VALUES (?, 'user', ?)",
                    [sessionId, message],
                    (err) => (err ? reject(err) : resolve())
                );
            });
        }

        // ================= GET CHAT HISTORY =================
        let historyText = "";

        if (userId && sessionId) {
            const history = await new Promise((resolve, reject) => {
                db.query(
                    "SELECT sender, message FROM Messages WHERE session_id=? ORDER BY id DESC LIMIT 10",
                    [sessionId],
                    (err, r) => (err ? reject(err) : resolve(r.reverse()))
                );
            });

            historyText = history
                .map(m => `${m.sender}: ${m.message}`)
                .join("\n");
        }

        // ================= CALL AI SERVICE =================
        const aiReply = await generateAIChatbot({
            major,
            historyText,
            message
        });

        // ================= SAVE AI RESPONSE =================
        if (userId && sessionId) {
            await new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO Messages (session_id, sender, message) VALUES (?, 'ai', ?)",
                    [sessionId, aiReply],
                    (err) => (err ? reject(err) : resolve())
                );
            });
        }

        // ================= RESPONSE =================
        res.json({
            reply: aiReply,
            mode: userId ? "logged-in" : "guest"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Chat failed" });
    }
});

module.exports = router;