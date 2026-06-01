const groq = require("../config/groq");
/*
AI Personalized Roadmap Generator

This module generates dynamic AI-powered learning
roadmaps using the Groq API based on the user's:

- Career role
- Skill gaps and weaknesses
- Personalized recommendations
- Academic major/background

Main Features:
- Automatically adjusts roadmap duration(number of weeks)
  based on user weaknesses
- Creates progressive learning flow:
  Beginner → Intermediate → Advanced
- Generates practical industry-focused steps
- Includes projects, portfolio tasks,
  deployment, and interview preparation
- Prevents repeated skills/topics
- Provides structured weekly learning plans
- Generates realistic study time estimates
- Creates YouTube search queries for resources
- Uses safe JSON parsing and fallback handling
- Applies automatic level correction if AI fails

The roadmap is designed to simulate a real
career development path that helps users
become job-ready step by step.

*/

//AI Roadmap generator function

async function generateRoadmapAI(role, gaps, recommendations, major) {

  const totalWeaknesses =
    (gaps?.length || 0) +
    (recommendations?.length || 0);

  let weeksCount = 4;

  if (totalWeaknesses >= 4) weeksCount = 6;
  if (totalWeaknesses >= 7) weeksCount = 8;
  if (totalWeaknesses >= 10) weeksCount = 10;

  // ================= LEVEL FLOW =================
  // Makes roadmap naturally progress:
  // Beginner -> Intermediate -> Advanced

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

    const match =
      raw.match(/\{[\s\S]*\}/);

    if (!match) {
      return {
        title: "Roadmap",
        description: "",
        weeks: []
      };
    }

    const parsed =
      JSON.parse(match[0]);

    // ================= FALLBACK LEVEL FIX =================
    // Ensures proper progression even if AI fails

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