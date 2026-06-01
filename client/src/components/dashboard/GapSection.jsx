import React from "react";
import { AlertCircle } from "lucide-react";

export default function GapSection({ gaps }) {
  return (
    <section className="bg-orange-500/10 border border-orange-400/20 rounded-3xl p-6">

      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-orange-400" />

        <h2 className="text-xl font-bold text-orange-300">
          Skill Gaps
        </h2>
      </div>

      <div className="space-y-3">

        {gaps.map((gap, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm"
          >
            {gap}
          </div>
        ))}

      </div>
    </section>
  );
}