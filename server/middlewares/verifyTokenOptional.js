const jwt = require("jsonwebtoken");       // Authentication using JWT tokens

// ================= OPTIONAL AUTH:hybrid routes (contact, feedback)=================
const verifyTokenOptional = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.userId = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IMPORTANT: match your existing structure
    req.userId = decoded.userId;

  } catch (err) {
    req.userId = null;
  }

  next();
};

module.exports = verifyTokenOptional;