const groq = require("../config/groq");
const personalities = require("../utils/personalities");

/*
========================================================
UNIVERSAL AI INTERVIEW GENERATOR SERVICE
========================================================

This service generates realistic AI interview questions
for ALL majors, careers, and industries.

Examples:
- Computer Science
- Business
- Marketing
- Medicine
- Nursing
- Finance
- Law
- Design
- Education
- Engineering
- Psychology
- Hospitality
- HR
- Aviation
- Architecture
- And more...

Features:
- Universal career adaptation
- Strict interview type enforcement
- Country-aware interview behavior
- Personality-driven interviews
- Difficulty progression
- Safer JSON parsing
- Question validation
- Balanced mixed interviews
- Real-world hiring simulation

========================================================
*/

const generateInterview = async (
  role,
  skills = [],
  gaps = [],
  major = "",
  personality = "strict",
  language = "English",
  country = "Lebanon",
  interviewType = "mixed",
  recommendations = []
) => {

  try {

    // ================= COUNTRY NORMALIZATION =================
    const normalizeCountry = (c = "") => {

      const map = {

        // Western
        "united states": "western",
        "usa": "western",
        "canada": "western",
        "united kingdom": "western",
        "australia": "western",

        // Asian
        "japan": "asian",
        "china": "asian",
        "south korea": "asian",
        "india": "asian",
        "singapore": "asian",

        // European
        "germany": "european",
        "france": "european",
        "netherlands": "european",
        "sweden": "european",

        // Middle Eastern
        "lebanon": "middle_eastern",
        "uae": "middle_eastern",
        "united arab emirates": "middle_eastern",
        "saudi arabia": "middle_eastern",
        "qatar": "middle_eastern",
        "kuwait": "middle_eastern"
      };

      return map[c.toLowerCase()] || "global";
    };

    const countryStyle = normalizeCountry(country);

    // ================= COUNTRY RULES =================
    const countryRules = {

      western: `
- Communication should be direct and confident
- Questions should emphasize leadership and ownership
- Encourage independent decision-making
- Interview tone should feel professional and fast-paced
`,

      asian: `
- Communication should be respectful and formal
- Questions should emphasize teamwork and discipline
- Structured and polite interview style
- Avoid aggressive communication
`,

      european: `
- Communication should be logical and structured
- Questions should emphasize reasoning and precision
- Interview should feel analytical and professional
`,

      middle_eastern: `
- Communication should be respectful and professional
- Questions should balance practical and interpersonal skills
- Interview tone should feel flexible and realistic
`,

      global: `
- Use balanced professional interview standards
- Maintain realistic global workplace communication
`
    };

    // ================= INTERVIEW TYPE RULES =================
    const typeRules = {

      technical: `
STRICT PROFESSIONAL INTERVIEW RULES:

ONLY generate profession-specific technical questions.

Examples:
- Engineering → systems, debugging, implementation
- Medical → diagnosis, procedures, patient scenarios
- Finance → calculations, financial analysis, risk assessment
- Marketing → campaign strategy, branding, analytics
- Design → UX decisions, accessibility, creativity
- Teaching → classroom management, pedagogy
- Business → operations, strategy, leadership
- Law → legal reasoning, ethics, case analysis

Questions MUST:
- Match the user's actual role and major
- Reflect real-world professional tasks
- Feel realistic for that industry

DO NOT generate:
- Generic HR questions
- Unrelated professions
- Random coding questions unless role requires coding
`,

      behavioral: `
STRICT BEHAVIORAL INTERVIEW RULES:

ONLY generate:
- Team conflicts
- Leadership experiences
- Workplace challenges
- Communication issues
- Collaboration examples
- Stress handling situations
- Failure and recovery stories

Questions MUST:
- Ask about REAL past experiences
- Use realistic workplace scenarios

Examples:
- Tell me about a time...
- Describe a situation where...
- Give an example of...

DO NOT generate:
- Technical knowledge questions
- HR screening questions
- Salary expectation questions
- Generic motivation questions
`,

      hr: `
STRICT HR INTERVIEW RULES:

ONLY generate:
- Motivation questions
- Career goals
- Strengths and weaknesses
- Personality questions
- Work preferences
- Company culture fit
- Salary expectations
- Career growth discussions

Questions MUST feel like:
- Recruiter screening round
- Initial HR interview
- Professional hiring conversation

DO NOT generate:
- Technical assessment questions
- Behavioral conflict stories
- Coding/system design scenarios
- Deep problem-solving cases
`,

      case: `
STRICT CASE INTERVIEW RULES:

ONLY generate:
- Business reasoning scenarios
- Decision-making situations
- Strategic thinking problems
- Analytical reasoning cases
- Industry-specific realistic scenarios

Questions MUST:
- Require logical reasoning
- Feel realistic and professional
- Match the candidate's profession

DO NOT generate:
- HR screening questions
- Generic motivational questions
- Technical exam-style questions
`,

      mixed: `
STRICT MIXED INTERVIEW RULES:

Generate EXACTLY:
- 4 professional/technical questions
- 2 behavioral questions
- 2 HR questions
- 2 situational/case questions

Question flow:
1. HR warm-up
2. Professional skill evaluation
3. Behavioral assessment
4. Situational/case conclusion

The interview MUST simulate a realistic company hiring pipeline.
`
    };

    // ================= LANGUAGE RULES =================
    const languageRules = `
IMPORTANT LANGUAGE RULES:

- Entire interview MUST be written ONLY in ${language}
- Use natural professional communication
- Do NOT mix languages
- Technical terminology may remain in English if necessary
`;

    // ================= SCORING RULES =================
    const scoringRules = `
SCORING RULES:

- Empty answer = 0/10
- Very short answer = maximum 2/10
- Generic answer = maximum 5/10

High scores (8-10) ONLY if answer is:
- Structured
- Detailed
- Relevant
- Professionally explained
- Accurate for the field
`;

    const totalQuestions = 10;

    // ================= PROMPT =================
    const prompt = `
${personalities[personality] || personalities.strict}

You are an elite AI interviewer simulating realistic professional hiring interviews.

${languageRules}

${scoringRules}

================================================
CANDIDATE PROFILE
================================================

Role:
${role || "Professional"}

Major:
${major || "Not specified"}

Country:
${country}

Interview Type:
${interviewType}

Skills:
${skills.length ? skills.join(", ") : "Not provided"}

Weak Areas:
${gaps.length ? gaps.join(", ") : "Not provided"}

Recommendations:
${recommendations.length
  ? recommendations.join(", ")
  : "Not provided"}

================================================
CORE RULES
================================================

- Role is the MAIN foundation of all questions
- Questions MUST reflect real industry expectations
- Weak areas MUST influence questions
- Avoid generic textbook questions
- Simulate realistic professional interviews
- Questions MUST feel natural and industry-specific

================================================
COUNTRY INTERVIEW STYLE
================================================

${countryRules[countryStyle]}

IMPORTANT:
The interview MUST reflect workplace culture and
communication expectations of ${country}.

================================================
INTERVIEW TYPE RULES
================================================

${typeRules[interviewType] || typeRules.mixed}

================================================
ROLE ADAPTATION
================================================

IMPORTANT:

The interview MUST dynamically adapt to:
- Role
- Major
- Skills
- Weak areas
- Career level

Questions MUST feel realistic for THAT profession.

Examples:

- Medical roles → patient care, ethics, diagnosis
- Business roles → leadership, analytics, strategy
- Design roles → creativity, UX thinking
- Engineering roles → systems and technical reasoning
- Education roles → teaching methods and classroom scenarios
- Marketing roles → branding and campaigns
- Finance roles → financial analysis and risk management
- Law roles → legal reasoning and ethics

DO NOT assume the candidate is in Computer Science.

The interview MUST naturally match the candidate's profession.

================================================
QUESTION FLOW
================================================

1. Warm-up
2. Daily work simulation
3. Problem solving
4. Workplace challenges
5. Advanced reasoning

================================================
DIFFICULTY PROGRESSION
================================================

Questions MUST gradually increase in difficulty.

Required order:

- Questions 1-2 → easy
- Questions 3-6 → medium
- Questions 7-10 → hard

The interview should feel progressively more challenging,
similar to real professional interviews.

Do NOT randomize difficulty order.

================================================
IMPORTANT
================================================

Generate EXACTLY ${totalQuestions} questions.

Return ONLY valid JSON.
NO markdown.
NO explanation.

================================================
OUTPUT FORMAT
================================================

{
  "role": "${role}",
  "major": "${major}",
  "language": "${language}",
  "country": "${country}",
  "interviewType": "${interviewType}",
  "level": "Junior | Mid | Senior",
  "totalQuestions": ${totalQuestions},
  "questions": [
    {
      "type": "technical | behavioral | hr | case | situational",
      "question": "string",
      "difficulty": "easy | medium | hard"
    }
  ]
}
`;

    // ================= AI REQUEST =================
    const response = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.3
    });

    const raw = response?.choices?.[0]?.message?.content || "";

    // ================= SAFE JSON PARSING =================
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid AI response format");
    }

    const parsed = JSON.parse(
      raw.slice(jsonStart, jsonEnd + 1)
    );

    // ================= TYPE VALIDATION =================
    const allowedTypes = {

      technical: ["technical"],

      behavioral: ["behavioral"],

      hr: ["hr"],

      case: ["case"],

      mixed: [
        "technical",
        "behavioral",
        "hr",
        "situational",
        "case"
      ]
    };

    parsed.questions = (parsed.questions || []).filter(
      (q) =>
        allowedTypes[interviewType]?.includes(q.type)
    );

    // ================= ENSURE QUESTION COUNT =================
    parsed.questions = parsed.questions.slice(0, totalQuestions);

    // ================= DIFFICULTY PROGRESSION =================
    const expectedDifficulties = [
      "easy",
      "easy",
      "medium",
      "medium",
      "medium",
      "medium",
      "hard",
      "hard",
      "hard",
      "hard"
    ];

    parsed.questions = parsed.questions.map((q, index) => ({
      ...q,
      difficulty: expectedDifficulties[index] || "medium"
    }));

    // ================= VALIDATION =================
    if (!parsed.questions.length) {
      throw new Error("AI generated invalid questions");
    }

    // ================= RETURN CLEAN DATA =================
    return {

      role: parsed.role || role,

      major: parsed.major || major,

      language: parsed.language || language,

      country: parsed.country || country,

      interviewType: parsed.interviewType || interviewType,

      level: parsed.level || "Mid",

      totalQuestions,

      questions: parsed.questions
    };

  } catch (err) {

    console.log("Interview AI Error:", err);

    // ================= SAFE FALLBACK =================
    return {

      role,

      major,

      language,

      country,

      interviewType,

      level: "Mid",

      totalQuestions: 1,

      questions: [
        {
          type:
            interviewType === "mixed"
              ? "technical"
              : interviewType,

          question:
            language === "Arabic"
              ? "حدثني عن خبرتك ومهاراتك."
              : "Tell me about your experience and skills.",

          difficulty: "easy"
        }
      ]
    };
  }
};

module.exports = generateInterview;