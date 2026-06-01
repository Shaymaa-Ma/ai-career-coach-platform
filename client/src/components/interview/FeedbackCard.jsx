import React from "react";

const FeedbackCard = ({ feedback, onNext, isLast }) => {
  if (!feedback) return null;

  const getScoreConfig = (score) => {
    if (score >= 8)
      return { text: "Excellent", color: "text-emerald-300", accent: "bg-emerald-400" };
    if (score >= 5)
      return { text: "Good", color: "text-yellow-300", accent: "bg-yellow-400" };
    return { text: "Needs Work", color: "text-red-300", accent: "bg-red-400" };
  };

  const config = getScoreConfig(feedback.score);

  const Stat = ({ label, value, color }) => (
    <div className="flex-1 min-w-[90px] bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-center">
      <div className={`text-lg font-bold ${color}`}>{value}/10</div>
      <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">{label}</p>
    </div>
  );

  const Section = ({ title, color, children, accent }) => (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-1 h-4 rounded-full ${accent}`} />
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${color}`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
        {children}
      </p>
    </div>
  );

  return (
    <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-xl p-4 sm:p-5 space-y-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/5">

        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${config.accent}`} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Evaluation
            </p>
            <h2 className={`text-lg font-bold ${config.color}`}>
              {config.text}
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <Stat label="Score" value={feedback.score} color={config.color} />
          <Stat label="Confidence" value={feedback.confidence} color="text-cyan-300" />
          <Stat label="Consistency" value={feedback.consistency} color="text-blue-300" />
        </div>

      </div>

      <Section title="Feedback" color="text-cyan-300" accent="bg-cyan-400">
        {feedback.feedback}
      </Section>

      {feedback.weakness && (
        <Section title="Improvement Area" color="text-red-300" accent="bg-red-400">
          {feedback.weakness}
        </Section>
      )}

      {feedback.improvedAnswer && (
        <Section title="Suggested Answer" color="text-cyan-300" accent="bg-cyan-400">
          {feedback.improvedAnswer}
        </Section>
      )}

      {/* ✅ ONLY CHANGE HERE */}
      <button
        onClick={onNext}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition ${
          isLast
            ? "bg-gradient-to-r from-emerald-500 to-green-600"
            : "bg-gradient-to-r from-cyan-500 to-blue-600"
        }`}
      >
        {isLast ? "Finish Interview →" : "Next Question →"}
      </button>

    </div>
  );
};

export default FeedbackCard;