import React from "react";
import { CheckCircle } from "lucide-react";

export default function RecommendationSection({ recommendations }) {
  return (
    <section className="bg-emerald-500/5 border border-emerald-400/20 rounded-3xl p-6">

      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="w-6 h-6 text-emerald-400" />

        <h2 className="text-xl font-bold text-emerald-300">
          AI Recommendations
        </h2>
      </div>

      <div className="space-y-3">

        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm"
          >
            {rec}
          </div>
        ))}

      </div>
    </section>
  );
}