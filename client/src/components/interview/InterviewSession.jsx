import React, { useEffect, useState } from "react";
import axios from "axios";

import QuestionCard from "./QuestionCard";
import AnswerBox from "./AnswerBox";
import FeedbackCard from "./FeedbackCard";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const STORAGE_KEY = "interview_progress";

const InterviewSession = ({ sessionId, onFinish, onStop }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  // ✅ FIX: internal loading (NO full screen UI)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const qRes = await axios.get(
          `http://localhost:5000/api/interview/${sessionId}/questions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setQuestions(qRes.data || []);

        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

        if (saved.sessionId === sessionId) {
          setIndex(saved.index ?? 0);
          setAnswer(saved.answer ?? "");
        }

        scrollToTop();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [sessionId]);

  // ================= PROGRESS =================
  const saveProgress = async (newIndex, newAnswer) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        sessionId,
        index: newIndex,
        answer: newAnswer,
      })
    );

    try {
      await axios.post(
        `http://localhost:5000/api/interview/${sessionId}/progress`,
        { index: newIndex, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch {}
  };

  // ================= LOADING STATE (NO FULL SCREEN BLOCK) =================
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-white">
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            Preparing your AI interview...
          </p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center text-gray-400 mt-20">
        No questions found.
      </div>
    );
  }

  const currentQuestion = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  const isLast = index + 1 >= questions.length;

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 text-white">

      {/* TOP BAR */}
      <div className="mb-4 bg-white/[0.03] border border-white/10 rounded-xl p-3 backdrop-blur-xl">
        <div className="flex justify-between text-xs mb-2">
          <div className="text-gray-300">
            Question {index + 1} / {questions.length}
          </div>

          <div className="flex gap-3">
            <span className="text-gray-400 hidden sm:block">
              No time limit ⏱
            </span>

            <button
              onClick={onFinish}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              Stop Interview
            </button>
          </div>
        </div>

        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* QUESTION */}
      <QuestionCard question={currentQuestion} index={index} />

      {/* ANSWER */}
      {!feedback && (
        <AnswerBox
          answer={answer}
          setAnswer={(val) => {
            setAnswer(val);
            saveProgress(index, val);
          }}
          onSubmit={async () => {
            const res = await axios.post(
              "http://localhost:5000/api/interview/answer",
              {
                questionId: currentQuestion.id,
                answer,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            setFeedback(res.data);
            scrollToTop();
          }}
        />
      )}

      {/* FEEDBACK */}
      {feedback && (
        <FeedbackCard
          feedback={feedback}
          onNext={async () => {
            const newIndex = index + 1;

            setAnswer("");
            setFeedback(null);

            await saveProgress(newIndex, "");

            if (newIndex >= questions.length) {
              localStorage.removeItem(STORAGE_KEY);
              onFinish();
              return;
            }

            setIndex(newIndex);
          }}
          isLast={isLast}
        />
      )}
    </div>
  );
};

export default InterviewSession;