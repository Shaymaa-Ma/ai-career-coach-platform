import React from "react";

const AnswerBox = ({ answer, setAnswer, onSubmit }) => {
  return (
    <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
            Your Answer
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          Evaluated on clarity, confidence & reasoning
        </p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="6"
        placeholder="Type your answer..."
        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white outline-none resize-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition"
      />

      <div className="flex justify-end mt-3">
        <button
          onClick={onSubmit}
          className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 active:scale-[0.98] transition"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default AnswerBox;
