import React from "react";
import {
  FileText,
  Brain,
  Settings,
  BarChart3,
  Rocket,
  ArrowRight,
  Cpu,
  Sparkles,
  Layers,
  Target,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import "../styles/global.css";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <main className="pt-28 pb-24 px-6 max-w-6xl mx-auto relative z-10">

        {/* HERO */}
        <section className="text-center mb-24">

          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300">
              <Sparkles className="w-4 h-4" />
              AI System Architecture
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
            System Architecture
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AI Career Intelligence is a modular AI system that transforms resumes into structured insights,
            personalized roadmaps, and interview preparation using multi-layer AI processing.
          </p>

        </section>

        {/* PIPELINE */}
        <section className="mb-28">

          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
            End-to-End AI Pipeline
          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-center">

            {[
              {
                title: "Input Layer",
                icon: FileText,
                desc: "Upload resume (PDF/DOCX)"
              },
              {
                title: "Processing",
                icon: Brain,
                desc: "AI extracts skills & experience"
              },
              {
                title: "Analysis Engine",
                icon: Settings,
                desc: "Scores resume & detects gaps"
              },
              {
                title: "AI Intelligence",
                icon: BarChart3,
                desc: "Generates insights & roadmap"
              },
              {
                title: "Output Layer",
                icon: Rocket,
                desc: "Dashboard, coach & interview prep"
              }
            ].map((step, i) => (
              <div key={i} className="relative group">

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">

                  {/* NEON ICON */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 group-hover:scale-110 transition">
                      <step.icon className="w-6 h-6 text-purple-300" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {step.desc}
                  </p>

                </div>

                {i !== 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-purple-400 text-xl">
                    →
                  </div>
                )}

              </div>
            ))}

          </div>

        </section>

        {/* MODULES */}
        <section className="mb-28">

          <h2 className="text-center text-4xl font-bold mb-16">
            Core System Modules
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Analysis Engine",
                icon: Cpu,
                color: "text-emerald-300",
                items: [
                  "AI Resume Analyzer",
                  "Skill Extraction System",
                  "Role Detection Engine",
                  "Resume Scoring Model"
                ]
              },
              {
                title: "Intelligence Layer",
                icon: BarChart3,
                color: "text-blue-300",
                items: [
                  "Career Analytics Dashboard",
                  "Skill Gap Detection",
                  "AI Recommendation System",
                  "Progress Tracking Engine"
                ]
              },
              {
                title: "Guidance Layer",
                icon: Lightbulb,
                color: "text-purple-300",
                items: [
                  "Learning Roadmap Generator",
                  "AI Coach Chat System",
                  "Interview Preparation AI",
                  "Career Path Guidance"
                ]
              }
            ].map((block, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-[1.02] transition"
              >

                <div className="flex items-center gap-3 mb-5">
                  <block.icon className={`w-6 h-6 ${block.color}`} />
                  <h3 className="text-xl font-bold">{block.title}</h3>
                </div>

                <ul className="space-y-2 text-gray-400 text-sm">
                  {block.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Target className="w-3 h-3 text-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

        </section>

        {/* WHY IT WORKS */}
        <section className="text-center">

          <h2 className="text-4xl font-bold mb-12">
            Why This System Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">

            {[
              {
                title: "Data-Driven",
                icon: BarChart3,
                text: "All recommendations are based on AI analysis of real resume data.",
                color: "text-emerald-300"
              },
              {
                title: "Personalized",
                icon: Sparkles,
                text: "Each user gets a unique career roadmap tailored to their profile.",
                color: "text-blue-300"
              },
              {
                title: "Continuous Growth",
                icon: ShieldCheck,
                text: "AI coach + roadmap + dashboard create a continuous learning loop.",
                color: "text-purple-300"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >

                <item.icon className={`w-6 h-6 mb-3 ${item.color}`} />

                <h3 className="font-bold mb-2">{item.title}</h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
};

export default About;