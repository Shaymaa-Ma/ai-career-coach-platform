import React from "react";

const RoadmapHeader = ({
  roadmap,
  progress,
  weeks,
  tasks,
  onRegenerate,
  regenerating,
}) => {
  return (
    <div className="relative pt-6 pb-10">

      {/* subtle glow (not a container) */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* HEADER TOP */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        {/* LEFT TEXT */}
        <div>

          <div className="text-xs tracking-widest text-cyan-400 uppercase mb-2">
            AI Learning Roadmap
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {roadmap.title}
          </h1>

          <p className="text-slate-400 mt-2 text-sm md:text-base max-w-2xl">
            {roadmap.description ||
              "Your personalized learning journey structured into progressive weekly milestones."}
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Role: <span className="text-slate-300">{roadmap.role}</span>
          </p>
        </div>


      </div>

      {/* INLINE METRICS (NO CARDS) */}
      <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-400">

        <div>
          <span className="text-white font-semibold">{weeks}</span> weeks
        </div>

        <div className="w-px bg-white/10" />

        <div>
          <span className="text-white font-semibold">{tasks}</span> tasks
        </div>

        <div className="w-px bg-white/10" />

        <div>
          <span className="text-cyan-400 font-semibold">{progress}%</span> completed
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="mt-6">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default RoadmapHeader;