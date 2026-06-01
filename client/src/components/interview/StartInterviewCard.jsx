import React, { useState } from "react";
import {
  Brain,
  Globe,
  Sparkles,
  Code2,
  Briefcase,
  Puzzle,
  Scale,
  Bot,
  Mic,
  ArrowRight,
  ChevronDown
} from "lucide-react";

const interviewTypes = [
  {
    id: "technical",
    title: "Technical",
    icon: Code2,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    desc: "Evaluates job-specific skills and domain knowledge relevant to the selected role."
  },
  {
    id: "behavioral",
    title: "Behavioral",
    icon: Brain,
    color: "text-purple-400",
    glow: "shadow-purple-500/20",
    desc: "Assesses communication, teamwork, leadership, and real workplace behavior."
  },
  {
    id: "hr",
    title: "HR Screening",
    icon: Mic,
    color: "text-pink-400",
    glow: "shadow-pink-500/20",
    desc: "Focuses on motivation, personality fit, career goals, and cultural alignment."
  },
  {
    id: "case",
    title: "Case Study",
    icon: Puzzle,
    color: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    desc: "Tests structured thinking, problem-solving, and decision-making abilities."
  },
  {
    id: "mixed",
    title: "Mixed",
    icon: Scale,
    color: "text-orange-400",
    glow: "shadow-orange-500/20",
    desc: "Provides a balanced mix of different interview question types for full evaluation."
  }
];

const personalities = ["friendly", "strict", "senior"];

const countries = [
  "Afghanistan","Albania","Algeria","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia and Herzegovina","Brazil","Bulgaria",
  "Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica","Croatia","Cyprus",
  "Czech Republic","Denmark","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia",
  "Ethiopia","Finland","France","Georgia","Germany","Ghana","Greece","Guatemala","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon","Libya","Lithuania",
  "Luxembourg","Malaysia","Mexico","Morocco","Nepal","Netherlands","New Zealand","Nigeria",
  "Norway","Oman","Pakistan","Palestine","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia","South Africa",
  "South Korea","Spain","Sri Lanka","Sweden","Switzerland","Syria","Thailand","Tunisia",
  "Turkey","UAE","Ukraine","United Kingdom","United States","Uruguay","Venezuela","Vietnam","Yemen"
];

const StartInterviewCard = ({
  onStart,
  settings,
  setSettings,
  starting
}) => {

  const [countryOpen, setCountryOpen] = useState(false);

  

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_35%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_35%)]" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />

      {/* ✅ FIX: equal height layout */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">

        {/* LEFT */}
        <div className="pt-6 h-full">

          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs tracking-[0.2em] uppercase text-cyan-300">
              AI Career Coach
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              Global AI
            </span>
            <br />
            <span className="text-white">
              Interview Simulator
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Experience realistic AI-powered interviews personalized to your
            resume, skills, role, and country — designed to simulate real hiring
            processes from top companies.
          </p>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10">

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <Globe className="w-6 h-6 text-cyan-400 mb-2" />
              <h3 className="font-bold">Global Ready</h3>
              <p className="text-sm text-gray-400">Country-based interviews.</p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <Bot className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-bold">AI Powered</h3>
              <p className="text-sm text-gray-400">Smart adaptive questions.</p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <Briefcase className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-bold">Realistic</h3>
              <p className="text-sm text-gray-400">FAANG-style simulation.</p>
            </div>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="h-full bg-white/[0.04] border border-white/10 rounded-[34px] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">Setup Interview</h2>
            <p className="text-gray-400 text-sm">
              Configure your personalized AI interview experience.
            </p>
          </div>

          <div className="space-y-5">

            {/* LANGUAGE */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Interview Language
              </label>

              <input
                type="text"
                placeholder="English, Arabic..."
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* COUNTRY FIXED DROPDOWN */}
            <div className="relative">
              <label className="text-sm text-gray-300 mb-2 block">
                Target Country
              </label>

              <Globe className="absolute left-4 top-[52px] w-5 h-5 text-cyan-400 pointer-events-none" />

              <ChevronDown
                className="absolute right-4 top-[52px] w-5 h-5 text-gray-400 cursor-pointer"
                onClick={() => setCountryOpen((p) => !p)}
              />

              <input
                type="text"
                placeholder="Type or select a country..."
                value={settings.country}
                onChange={(e) =>
                  setSettings({ ...settings, country: e.target.value })
                }
                onFocus={() => setCountryOpen(true)}
                className="w-full bg-black/30 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:border-cyan-400/50"
              />

              {countryOpen && (
                <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto bg-black/90 border border-white/10 rounded-2xl backdrop-blur-xl">

                  {countries
                    .filter((c) =>
                      c.toLowerCase().includes(
                        (settings.country || "").toLowerCase()
                      )
                    )
                    .map((country) => (
                      <div
                        key={country}
                        onClick={() => {
                          setSettings({ ...settings, country });
                          setCountryOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-white/10 cursor-pointer text-sm"
                      >
                        {country}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* PERSONALITY */}
            <div>
              <label className="text-sm text-gray-300 mb-3 block">
                Interviewer Personality
              </label>

              <div className="grid grid-cols-3 gap-3">

                {personalities.map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      setSettings({ ...settings, personality: p })
                    }
                    className={`py-3 rounded-2xl capitalize text-sm border ${
                      settings.personality === p
                        ? "bg-cyan-500/20 border-cyan-400"
                        : "bg-white/[0.03] border-white/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              </div>
            </div>

            {/* INTERVIEW TYPES */}
            <div>
              <label className="text-sm text-gray-300 mb-3 block">
                Interview Type
              </label>

              <div className="grid gap-3">

                {interviewTypes.map((t) => {
                  const Icon = t.icon;

                  return (
                    <button
                      key={t.id}
                      onClick={() =>
                        setSettings({ ...settings, interviewType: t.id })
                      }
                      className={`p-4 rounded-3xl border text-left ${
                        settings.interviewType === t.id
                          ? "border-cyan-400 bg-cyan-500/10"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex gap-3">
                        <Icon className={`w-7 h-7 ${t.color}`} />
                        <div>
                          <h3 className="font-bold">{t.title}</h3>
                          <p className="text-sm text-gray-400">{t.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={onStart}
              disabled={starting}
              className={`w-full mt-2 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${
                starting
                  ? "bg-gray-700"
                  : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
              }`}
            >
              {starting ? "Creating Interview..." : (
                <>
                  Start AI Interview
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StartInterviewCard;