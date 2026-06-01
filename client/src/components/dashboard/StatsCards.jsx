import React from "react";
import { Trophy, Briefcase, Sparkles, BarChart3 } from "lucide-react";

export default function StatsCards({ data }) {

  const getLevel = (score) => {
    if (score >= 85) return "Senior";
    if (score >= 60) return "Mid";
    if (score >= 40) return "Junior";
    return "Beginner";
  };

  const cards = [
    { title: "Score", value: `${data.overallScore}/100`, icon: Trophy },
    { title: "Level", value: getLevel(data.overallScore), icon: BarChart3 },
    { title: "Skills", value: data.skills.length, icon: Sparkles },
    { title: "Role", value: data.role, icon: Briefcase }
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="bg-black/30 border border-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-5"
          >

            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>

            <h3 className="text-xs text-gray-400">{card.title}</h3>

            <p className="text-lg md:text-xl font-bold break-words">
              {card.value}
            </p>

          </div>
        );
      })}

    </section>
  );
}