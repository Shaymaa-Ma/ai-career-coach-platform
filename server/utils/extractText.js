
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

// ================= TEXT EXTRACTION =================
async function extractText(filePath) {
  try {
    const ext = filePath.split(".").pop().toLowerCase();

    if (ext === "pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      return data.text || "";
    }

    if (ext === "docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value || "";
    }
    if (ext === "doc") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value || "";
    }

    return "";
  } catch (err) {
    console.log("TEXT EXTRACTION ERROR:", err);
    return "";
  }
}

module.exports = extractText;