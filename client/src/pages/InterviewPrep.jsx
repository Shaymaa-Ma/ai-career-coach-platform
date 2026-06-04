import React, { useEffect, useState } from "react";
import StartInterviewCard from "../components/interview/StartInterviewCard";
import InterviewSession from "../components/interview/InterviewSession";
import InterviewReport from "../components/interview/InterviewReport";
import api from "../api";

const InterviewPrep = () => {
  const token = localStorage.getItem("token");

  const [sessionId, setSessionId] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hasResume, setHasResume] = useState(null); // IMPORTANT: null = unknown yet
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState({
    language: "English",
    country: "Lebanon",
    interviewType: "mixed",
    personality: "friendly",
  });

  // ================= RESTORE SESSION =================
  useEffect(() => {
  const restoreSession = async () => {
    const savedSession = localStorage.getItem("sessionId");

    if (!savedSession) return;

    try {
      const res = await api.get(
        `/api/interview/${savedSession}/questions`
      );

      if (res.data?.length > 0) {
        setSessionId(savedSession);
      } else {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("interview_progress");
      }
    } catch {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("interview_progress");
    }
  };

  restoreSession();
}, []);

  // ================= CHECK RESUME =================
  const checkResume = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/dashboard");
      setHasResume(res.data?.hasResume ?? false);
    } catch (err) {
      setHasResume(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkResume();
  }, []);

  // ================= START INTERVIEW =================
  const startInterview = async () => {
    try {
      setStarting(true);
      setError(null);

      const res = await api.post("/api/interview/start", {
        personality: settings.personality,
        language: settings.language,
        country: settings.country,
        interviewType: settings.interviewType,
      });

      if (!res.data?.sessionId) throw new Error("No sessionId returned");

      localStorage.setItem("sessionId", res.data.sessionId);
      localStorage.removeItem("interview_progress");

      setSessionId(res.data.sessionId);
    } catch (err) {
      setError(err?.response?.data?.details || "Failed to start interview.");
    } finally {
      setStarting(false);
    }
  };

  // ================= FINISH =================
  const finishInterview = async () => {
    try {
      const res = await api.get(`/api/interview/${sessionId}/report`);
      setReport(res.data);

      localStorage.removeItem("sessionId");
      localStorage.removeItem("interview_progress");
    } catch (err) {
      console.log(err);
    }
  };

  // ================= STOP =================
  const stopInterview = () => {
    const confirmStop = window.confirm("Stop interview?");
    if (!confirmStop) return;

    localStorage.removeItem("sessionId");
    localStorage.removeItem("interview_progress");

    setSessionId(null);
    setReport(null);
  };

  // ================= RESET =================
  const resetInterview = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("interview_progress");

    setSessionId(null);
    setReport(null);
  };

  // ================= LOADING =================
  if (loading || hasResume === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // ================= NO TOKEN OR NO RESUME =================
if (!token || !hasResume) {
  return (
    <div className="
      min-h-screen
      bg-[#050816]
      flex items-center justify-center
      px-4
      pt-32
      pb-10
      relative
      overflow-hidden
    ">

      {/* BACKGROUND BLOBS */}
      <div className="
        absolute top-0 left-0
        w-[380px] h-[380px]
        bg-cyan-500/15
        blur-[110px]
        rounded-full
      " />

      <div className="
        absolute bottom-0 right-0
        w-[380px] h-[380px]
        bg-blue-600/15
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
              🎤 AI Interview Engine
            </div>

            <h1 className="
              text-2xl md:text-3xl
              font-black
              leading-snug
              mb-3
            ">
              Unlock Your AI Interview Experience
            </h1>

            <p className="
              text-slate-400
              text-sm
              leading-relaxed
              mb-6
            ">
              Your interview is dynamically generated from your resume and tailored
              to your role, skills, and experience. It simulates real hiring
              processes used by companies worldwide.
            </p>

            <button
              onClick={() => (window.location.href = "/upload")}
              className="
                px-6 py-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                hover:scale-[1.02]
                transition-all
                text-sm font-semibold
                shadow-lg shadow-cyan-500/10
              "
            >
              Upload Resume
            </button>

          </div>

          {/* RIGHT */}
          <div className="
            hidden lg:flex
            items-center justify-center
            p-6
          ">

            <div className="w-full max-w-xs space-y-3">

              {/* HEADER */}
              <div className="
                rounded-2xl
                border border-white/10
                bg-slate-900/60
                p-4
              ">
                <p className="text-xs text-slate-400 mb-1">
                  How AI Interview Works
                </p>
                <h3 className="font-bold text-base">
                  Real Hiring Simulation Engine
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Based on structured recruitment pipelines
                </p>
              </div>

              {/* STEPS (aligned with your backend logic) */}
              {[
                {
                  title: "Analyze resume",
                  desc: "Extract role, skills, experience, and gaps"
                },
                {
                  title: "Build question set",
                  desc: "Generate technical, HR, behavioral & case questions"
                },
                {
                  title: "Apply interview rules",
                  desc: "Personality, country style, and difficulty logic"
                },
                {
                  title: "Simulate real hiring",
                  desc: "Progressive interview flow (easy → hard)"
                }
              ].map((step, i) => (
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
                    border border-white/10
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
}

  // ================= INTERVIEW UI =================
  return (
    <div className="min-h-screen bg-[#050816] text-white pt-24">

      {error && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-red-500/20 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* START CARD */}
      {!sessionId && !report && (
        <StartInterviewCard
          onStart={startInterview}
          settings={settings}
          setSettings={setSettings}
          starting={starting}
        />
      )}

      {/* SESSION */}
      {sessionId && !report && (
        <InterviewSession
          sessionId={sessionId}
          onFinish={finishInterview}
          onStop={stopInterview}
        />
      )}

      {/* REPORT */}
      {report && (
        <InterviewReport report={report} onRestart={resetInterview} />
      )}
    </div>
  );
};

export default InterviewPrep;