const crypto = require("crypto");

//==============IMPORTANT— HASH FOR SAME RESULTS===============
function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

module.exports = hashText;