import React from "react";

const QuestionCard = ({ question, index }) => {
  const difficultyColor = {
    easy: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
    medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    hard: "text-red-400 border-red-400/30 bg-red-400/5",
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
          <span className="text-cyan-400 font-semibold">Q{index + 1}</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-500">AI Interview</span>
        </div>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/30 border border-white/10 text-xs capitalize text-gray-300">
            {question.type}
          </span>
          <span
            className={`px-2.5 py-1 rounded-md border text-xs capitalize font-medium ${difficultyColor[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      <p className="text-gray-100 text-base sm:text-lg leading-relaxed">
        {question.question}
      </p>
    </div>
  );
};

export default QuestionCard;
