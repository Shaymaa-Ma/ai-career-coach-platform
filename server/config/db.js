// MySQL database connection
const mysql = require("mysql2");           

// ================= CREATE CONNECTION =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "career_coach"
});

// ================= CONNECT =================
db.connect(() => {
  console.log("DB Connected");
});


module.exports = db;