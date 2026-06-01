
//Resume Validation Helper: fake PDFs blocked, garbage input blocked, AI quality improves instantly
function validateResume(text) {
  if (!text || text.trim().length < 120) {
    return "Resume text is too short or unreadable.";
  }

  const lower = text.toLowerCase();

  const hasExperience =
    lower.includes("experience") ||
    lower.includes("work history") ||
    lower.includes("employment");

  const hasEducation =
    lower.includes("education") ||
    lower.includes("academic");

  const hasSkills =
    lower.includes("skills") ||
    lower.includes("technical skills") ||
    lower.includes("professional skills");

  const hasProjects =
    lower.includes("project") ||
    lower.includes("projects");

  const wordCount = text.trim().split(/\s+/).length;

  if (wordCount < 60) {
    return "Resume content is too small. Please add more details.";
  }

  // REQUIRE AT LEAST 2 SECTIONS (flexible but controlled)
  const sectionsFound = [hasExperience, hasEducation, hasSkills, hasProjects]
    .filter(Boolean).length;

  if (sectionsFound < 2) {
    return "Resume must include at least two sections (e.g., Skills, Experience, Education, or Projects).";
  }

  return null;
}

module.exports = validateResume;