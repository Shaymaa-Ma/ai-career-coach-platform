const groq = require("../config/groq");

/*
AI Personalized Roadmap Generator

Creates adaptive, AI-powered learning roadmaps
based on a user's role, skill gaps, recommendations,
and academic background.

The roadmap follows a progressive learning path,
includes practical projects and interview preparation,
and provides a structured journey from beginner to
job-ready proficiency.
*/

//AI Roadmap generator function
async function generateRoadmapAI(role, gaps, recommendations, major) {

  // --------------------------------------------------
  // Analyze detected weaknesses
  // The number of gaps and recommendations determines
  // how extensive the learning roadmap should be.
  // --------------------------------------------------

  const totalWeaknesses =
    (gaps?.length || 0) +
    (recommendations?.length || 0);

  // --------------------------------------------------
  // Dynamic Roadmap Duration
  // More weaknesses result in a longer roadmap
  // to provide sufficient learning coverage.
  // --------------------------------------------------

  let weeksCount = 4;

  if (totalWeaknesses >= 4) weeksCount = 6;
  if (totalWeaknesses >= 7) weeksCount = 8;
  if (totalWeaknesses >= 10) weeksCount = 10;

  // --------------------------------------------------
  // Learning Progression Strategy
  // The roadmap follows a structured progression:
  // Beginner → Intermediate → Advanced
  // This prevents overwhelming users and ensures
  // gradual skill development.
  // --------------------------------------------------

  let roadmapFlow = "";

  if (weeksCount <= 4) {
    roadmapFlow = `
- Week 1 MUST be Beginner
- Week 2 MUST be Beginner
- Week 3 MUST be Intermediate
- Week 4 MUST be Advanced
`;
  }

  else if (weeksCount <= 6) {
    roadmapFlow = `
- Weeks 1-2 MUST be Beginner
- Weeks 3-4 MUST be Intermediate
- Weeks 5-6 MUST be Advanced
`;
  }

  else if (weeksCount <= 8) {
    roadmapFlow = `
- Weeks 1-3 MUST be Beginner
- Weeks 4-6 MUST be Intermediate
- Weeks 7-8 MUST be Advanced
`;
  }

  else {
    roadmapFlow = `
- Weeks 1-3 MUST be Beginner
- Weeks 4-7 MUST be Intermediate
- Weeks 8-10 MUST be Advanced
`;
  }


  // --------------------------------------------------
  // AI Prompt Construction
  // Generates detailed instructions for the AI model
  // to create a realistic and personalized roadmap
  // based on the user's profile.
  // --------------------------------------------------

  const prompt = `
You are a senior AI learning architect.

Generate a REAL-WORLD personalized learning roadmap.

ROADMAP RULES:
- Practical
- Industry-focused
- Job-ready
- EXACTLY ${weeksCount} weeks
- Each week must contain 2 to 4 learning steps
- The roadmap difficulty MUST increase gradually
- (DO NOT randomly assign levels)
- NEVER repeat same skill twice
- Every week must focus on a DIFFERENT area
- Include projects frequently
- Include portfolio-building tasks
- Include interview preparation near final weeks
- Include deployment/building real applications in advanced stages

LEVEL PROGRESSION RULES:
${roadmapFlow}

STEP RULES:
For every step:
- skill should be concise
- description should be practical
- level MUST match the week difficulty
- estimatedTime should be realistic
- estimatedTime examples:
  "30-60 min"
  "1-2 hours"
  "2-4 hours"

RESOURCE RULES:
- NEVER provide real URLs
- url MUST be null
- use searchQuery for YouTube search
- searchQuery must be realistic and specific

IMPORTANT:
- Beginner weeks should focus on fundamentals
- Intermediate weeks should focus on projects and deeper understanding
- Advanced weeks should focus on real-world implementation, optimization, architecture, deployment, scaling, or interview preparation

Return JSON ONLY.

JSON FORMAT:

{
  "title": "string",
  "description": "string",
  "weeks": [
    {
      "week": 1,
      "title": "string",
      "focus": "string",
      "level": "Beginner",
      "steps": [
        {
          "skill": "string",
          "level": "Beginner",
          "description": "string",
          "estimatedTime": "1-2 hours",
          "resource": {
            "title": "string",
            "type": "video",
            "platform": "youtube",
            "url": null,  
            "searchQuery": "string"
          }
        }
      ]
    }
  ]
}

USER ROLE:
${role}

SKILL GAPS:
${gaps?.join(", ") || ""}

RECOMMENDATIONS:
${recommendations?.join(", ") || ""}

MAJOR:
${major || ""}
`;

  try {

    // --------------------------------------------------
    // Generate Roadmap using Groq AI
    // LLaMA 3.3 70B creates a structured roadmap
    // following all learning progression rules.
    // --------------------------------------------------

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

    const raw =
      response.choices?.[0]?.message?.content || "";

    // --------------------------------------------------
    // Safe JSON Extraction
    // AI responses may contain unexpected text.
    // Extract only the JSON object required by
    // the application.
    // --------------------------------------------------

    const match =
      raw.match(/\{[\s\S]*\}/);

    if (!match) {
      return {
        title: "Roadmap",
        description: "",
        weeks: [] //
      };
    }


    // --------------------------------------------------
    // Convert AI response into JavaScript object
    // --------------------------------------------------

    const parsed =
      JSON.parse(match[0]);

    // --------------------------------------------------
    // Automatic Level Correction
    // Even if the AI returns incorrect levels,
    // the system enforces a proper learning flow:
    // Beginner → Intermediate → Advanced
    // This guarantees roadmap consistency and
    // improves the learning experience.
    // --------------------------------------------------

    const fixedWeeks =
      (parsed.weeks || []).map((week, index) => {

        let level = "Beginner";

        const position =
          (index + 1) / weeksCount;

        if (position <= 0.35) {
          level = "Beginner";
        }
        else if (position <= 0.75) {
          level = "Intermediate";
        }
        else {
          level = "Advanced";
        }

        return {
          ...week,
          level: week.level || level,

          steps: (week.steps || []).map((step) => ({
            ...step,
            level: step.level || level
          }))
        };
      });

    return {
      title:
        parsed.title || "Learning Roadmap",

      description:
        parsed.description || "",

      weeks: fixedWeeks
    };

  } catch (err) {

    console.log("AI ERROR:", err);

    return {
      title: "Roadmap",
      description: "",
      weeks: []
    };
  }
}

module.exports = generateRoadmapAI;