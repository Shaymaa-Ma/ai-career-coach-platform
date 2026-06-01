import React from "react";

const RoadmapStepCard = ({ step, onToggle, disabled }) => {
  const openResource = () => {
    const query = step.resource_url;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query || step.skill_name
      )}`,
      "_blank"
    );
  };

  // ================= LEVEL STYLE =================
  const levelStyle = () => {
    switch (step.level) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";

      case "Intermediate":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";

      case "Advanced":
        return "bg-violet-500/10 text-violet-300 border-violet-500/20";

      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        flex flex-col lg:flex-row
        lg:items-center
        justify-between
        gap-4
        transition-all

        ${step.completed
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-slate-900/70 border-white/10"
        }
      `}
    >

      {/* LEFT */}
      <div className="flex gap-4 flex-1 min-w-0">

        {/* ICON */}
        <div
          className={`
            w-12 h-12
            rounded-xl
            flex items-center justify-center
            flex-shrink-0
            text-lg

            ${step.completed
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-cyan-500/10 text-cyan-300"
            }
          `}
        >
          {step.completed ? "✓" : "▶"}
        </div>

        <div className="min-w-0">

          <h3 className="font-bold truncate">
            {step.skill_name}
          </h3>

          <p className="text-sm text-slate-400 mt-1 break-words">
            {step.description}
          </p>

          {/* ================= LEVEL BADGE ================= */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">

            <span
              className={`
                px-2.5 py-1
                text-[10px]
                rounded-full
                border
                font-semibold
                ${levelStyle()}
              `}
            >
              {step.level}
            </span>

            <span className="text-[11px] text-slate-500">
              Learning difficulty
            </span>

          </div>

        </div>
      </div>

      {/* RIGHT BUTTONS */}
      <div
        className="
          flex flex-row flex-wrap sm:flex-nowrap
          gap-3
          w-full lg:w-auto
        "
      >
        <button
          onClick={openResource}
          className="
            flex-1 sm:flex-none
            px-4 py-2
            rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-sm font-semibold
            whitespace-nowrap
            hover:scale-[1.02]
            transition
          "
        >
          Start Learning
        </button>

        <button
          disabled={disabled}
          onClick={() => onToggle(step.id, !step.completed)}
          className={`
            disabled:opacity-40
disabled:cursor-not-allowed
            flex-1 sm:flex-none
            px-4 py-2
            rounded-xl
            text-sm font-semibold
            whitespace-nowrap
            transition-all

            ${step.completed
              ? "bg-emerald-500 text-white"
              : "bg-white/5 border border-white/10 hover:bg-white/10"
            }
          `}
        >
          {step.completed ? "Completed" : "Mark Done"}
        </button>
      </div>

    </div>
  );
};

export default RoadmapStepCard;