import React from "react";

const RoadmapStarterCard = ({ onStart, loading, hasResume }) => {

  const handleClick = () => {
    if (!hasResume) {
      window.location.href = "/upload";
      return;
    }
    onStart();
  };

  const steps = [
    {
      title: "Analyze your resume",
      desc: "We extract skills, role, gaps, and experience from your resume"
    },
    {
      title: "Detect skill gaps",
      desc: "AI compares your resume with real job requirements"
    },
    {
      title: "Build roadmap",
      desc: "Weekly structured learning path is generated"
    },
    {
      title: "Track progress",
      desc: "Mark tasks as complete and monitor growth"
    }
  ];

  return (
    <div className="
      min-h-screen
      bg-slate-950
      flex items-center justify-center
      px-4
      pt-32
      pb-10
      overflow-hidden
      relative
    ">

      {/* BACKGROUND */}
      <div className="
        absolute top-0 left-0
        w-[380px] h-[380px]
        bg-cyan-500/20
        blur-[110px]
        rounded-full
      " />

      <div className="
        absolute bottom-0 right-0
        w-[380px] h-[380px]
        bg-blue-600/20
        blur-[110px]
        rounded-full
      " />

      {/* CARD */}
      <div className="
        relative z-10
        w-full max-w-4xl
        rounded-[28px]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
        overflow-hidden
        shadow-2xl
      ">

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}
          <div className="p-6 md:p-8 flex flex-col justify-center">

            <div className="
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-cyan-500/10
              border border-cyan-500/20
              text-cyan-300
              text-[11px]
              mb-4
            ">
              🚀 AI Career Roadmap Engine
            </div>

            <h1 className="
              text-2xl md:text-3xl
              font-black
              leading-snug
              mb-3
            ">
              {hasResume
                ? "Your Personalized Learning System"
                : "Unlock Your Learning Path"}
            </h1>

            <p className="
              text-slate-400
              text-sm
              leading-relaxed
              mb-6
            ">
              {hasResume
                ? "We transform your resume into a structured roadmap with weekly goals, real resources, and progress tracking."
                : "Upload your resume so our AI can analyze your profile and generate a structured learning journey tailored to your goals."}
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className="
                px-6 py-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                hover:scale-[1.02]
                transition-all
                text-sm font-semibold
                shadow-lg shadow-cyan-500/20
                disabled:opacity-50
              "
            >
              {!hasResume
                ? "Upload Resume"
                : loading
                  ? "Generating..."
                  : "Generate Roadmap"}
            </button>
          </div>

          {/* RIGHT (FLOW UI) */}
          <div className="
            hidden lg:flex
            items-center justify-center
            p-6
          ">

            <div className="w-full max-w-xs space-y-3">

              <div className="
                rounded-2xl
                border border-white/10
                bg-slate-900/60
                p-4
              ">
                <p className="text-xs text-slate-400 mb-1">
                  How it works
                </p>
                <h3 className="font-bold text-base">
                  AI Roadmap Pipeline
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  From resume → to structured learning journey
                </p>
              </div>

              {steps.map((step, i) => (
                <div
                  key={i}
                  className="
                    flex gap-3
                    rounded-xl
                    border border-white/10
                    bg-white/[0.03]
                    p-3
                  "
                >
                  <div className="
                    w-8 h-8
                    rounded-lg
                    bg-cyan-500/10
                    border border-cyan-500/20
                    flex items-center justify-center
                    text-xs font-bold text-cyan-300
                  ">
                    {i + 1}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      {step.title}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RoadmapStarterCard;