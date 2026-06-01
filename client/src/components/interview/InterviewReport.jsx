import React from "react";

const InterviewReport = ({ report, onRestart }) => {
  if (!report) return null;

  const Stat = ({ label, value, color }) => (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
      <div className={`text-2xl sm:text-3xl font-bold ${color} mb-1`}>{value}</div>
      <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
    </div>
  );

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-3xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-xl">
        {/* HEAD */}
        <div className="text-center mb-6">
          <p className="text-cyan-400 uppercase tracking-[0.2em] text-[10px] mb-2">
            AI Interview Analysis
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Final Report
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Professional evaluation of your performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat label="Overall" value={report.overallScore} color="text-cyan-300" />
          <Stat label="Hire Probability" value={report.hireProbability} color="text-emerald-300" />
          <Stat label="Level" value={report.level} color="text-blue-300" />
        </div>

        {/* FEEDBACK */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-4 sm:p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-cyan-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Professional Feedback
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
            {report.insight}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition"
        >
          Restart Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewReport;
