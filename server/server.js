// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ================= APP =================
const app = express();

// ================= MIDDLEWARES =================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

// ================= API ROUTES =================
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", contactRoutes);
app.use("/api", chatRoutes);
app.use("/api", roadmapRoutes);
app.use("/api", interviewRoutes);

// ================= ROOT TEST ROUTE =================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Career Coach API is running"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});