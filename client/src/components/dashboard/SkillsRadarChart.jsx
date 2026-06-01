import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const SkillsRadarChart = ({ skills = [] }) => {
  const safeSkills = Array.isArray(skills) ? skills : [];

  const chartData = safeSkills.slice(0, 8).map((skill) => ({
    skill: skill.name,
    score: skill.score,
  }));

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">

      {/* Header (smaller spacing) */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Skills Intelligence
          </h2>

          <p className="text-gray-400 mt-1 text-xs md:text-sm">
            AI visualization of your strongest technical skills.
          </p>
        </div>

        <div className="hidden md:flex px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          AI Powered
        </div>
      </div>

      {/* Chart */}
      {!chartData.length ? (
        <div className="text-center py-14">
          <p className="text-gray-400 text-sm">
            No skills available yet.
          </p>
        </div>
      ) : (
        <div className="w-full h-[300px] md:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="65%"
              data={chartData}
            >
              <PolarGrid stroke="rgba(255,255,255,0.12)" />

              <PolarAngleAxis
                dataKey="skill"
                tick={{
                  fill: "#d1d5db",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#6b7280", fontSize: 10 }}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "12px",
                }}
              />

              <Radar
                name="Skills"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.45}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bottom stats (more compact) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-purple-400">
            {safeSkills.length}
          </div>
          <div className="text-xs text-gray-400">
            Skills
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-blue-400">
            {safeSkills.length
              ? Math.round(
                  safeSkills.reduce((a, b) => a + b.score, 0) /
                    safeSkills.length
                )
              : 0}
            %
          </div>
          <div className="text-xs text-gray-400">
            Avg
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">
            {safeSkills.filter((s) => s.score >= 80).length}
          </div>
          <div className="text-xs text-gray-400">
            Strong
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-orange-400">
            {safeSkills.filter((s) => s.score < 60).length}
          </div>
          <div className="text-xs text-gray-400">
            Weak
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsRadarChart;