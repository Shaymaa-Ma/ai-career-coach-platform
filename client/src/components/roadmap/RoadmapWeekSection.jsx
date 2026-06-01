// ================= components/roadmap/RoadmapWeekSection.jsx =================

import React from "react";
import RoadmapStepCard from "./RoadmapStepCard";

const RoadmapWeekSection = ({
    week,
    onToggleStep,
}) => {

    const completed =
        week.steps?.filter((s) => s.completed).length || 0;

    const total =
        week.steps?.length || 0;

    return (
        <div
            className="
      rounded-[28px]
      border border-white/10
      bg-white/[0.04]
      backdrop-blur-2xl
      overflow-hidden
    "
        >

            {/* HEADER */}
            <div
                className="
        px-6 py-5
        border-b border-white/10
        flex flex-col md:flex-row
        md:items-center
        md:justify-between
        gap-4
      "
            >

                <div>
                    <div
                        className="
            inline-flex
            px-3 py-1
            rounded-full
            text-xs
            bg-cyan-500/10
            text-cyan-300
            border border-cyan-500/20
            mb-3
          "
                    >
                        Week {week.week_number}
                    </div>

                    <h2 className="text-2xl font-black">
                        {week.title}
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                        {week.focus}
                    </p>
                    {!week.unlocked && (
                        <div className="
    mt-3
    inline-flex
    items-center
    gap-2
    px-3 py-1.5
    rounded-full
    text-xs
    bg-amber-500/10
    text-amber-300
    border border-amber-500/20
  ">
                            🔒 Complete previous week to unlock
                        </div>
                    )}
                </div>

                <div
                    className="
          w-24 h-24
          rounded-full
          border border-white/10
          flex items-center justify-center
          bg-slate-900/50
          text-center
        "
                >
                    <div>
                        <p className="text-2xl font-black text-cyan-400">
                            {completed}/{total}
                        </p>

                        <p className="text-xs text-slate-400">
                            Completed
                        </p>
                    </div>
                </div>

            </div>

            {/* STEPS */}
            <div className="p-5 space-y-4">

                {week.steps?.map((step) => (
                    <RoadmapStepCard
                        key={step.id}
                        step={step}
                        disabled={!week.unlocked}
                        onToggle={onToggleStep}
                    />
                ))}

            </div>

        </div>
    );
};

export default RoadmapWeekSection;