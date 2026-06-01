// Home.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Target, BarChart3, Map, Bot, Mic, Sparkles, ArrowRight, ChevronDown, Upload, Brain, LineChart, GraduationCap, CheckCircle2, Star } from "lucide-react";
import heroImage from "../assets/hero_img1.png";
import "../styles/home.css";


export default function Home() {

  // FAQ State
  const [faqOpen, setFaqOpen] = useState(0);

  // Features
  const features = [
    {
      icon: FileText,
      title: "AI Resume Analyzer",
      desc: "Upload your resume and receive AI-powered skill extraction, scoring, role detection, and personalized career insights.",
    },
    {
      icon: Target,
      title: "Smart Skill Gap Detection",
      desc: "Automatically detect missing or weak skills with clear suggestions on what to improve next.",
    },
    {
      icon: BarChart3,
      title: "Career Analytics Dashboard",
      desc: "Track strengths, weaknesses, recommendations, and overall career readiness.",
    },
    {
      icon: Map,
      title: "AI Learning Roadmap",
      desc: "Generate personalized weekly learning plans based on your career goals.",
    },
    {
      icon: Bot,
      title: "AI Coach Chatbot",
      desc: "Get instant AI-powered career guidance and learning support.",
    },
    {
      icon: Mic,
      title: "AI Interview Preparation",
      desc: "Practice interviews with intelligent AI-generated preparation sessions.",
    },
  ];

  // Steps
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      desc: "Securely upload your PDF or DOCX resume.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      desc: "AI extracts skills and evaluates your career readiness.",
    },
    {
      icon: LineChart,
      title: "Career Dashboard",
      desc: "View insights, analytics, scores, and recommendations.",
    },
    {
      icon: Map,
      title: "Learning Roadmap",
      desc: "Receive personalized weekly learning goals.",
    },
    {
      icon: Bot,
      title: "AI Coach Sessions",
      desc: "Interact with your personal AI career coach.",
    },
    {
      icon: GraduationCap,
      title: "Interview Preparation",
      desc: "Improve confidence through AI interview simulations.",
    },
  ];


  // FAQ
  const faqs = [
    {
      q: "How does the AI resume analysis work?",
      a: "The system extracts resume content, analyzes skills and experience using AI, identifies career gaps, and generates intelligent insights.",
    },
    {
      q: "What file formats are supported?",
      a: "The platform currently supports PDF and DOCX uploads.",
    },
    {
      q: "How are learning roadmaps generated?",
      a: "Roadmaps are generated using your detected role, missing skills, and AI recommendations.",
    },
    {
      q: "Does the platform support different career fields?",
      a: "Yes. Technology, business, healthcare, marketing, engineering, finance, design, and more.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_50%)] pointer-events-none" />

      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-36 sm:pt-40 lg:pt-44 pb-24 sm:pb-28 lg:pb-32">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">

            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs sm:text-sm text-purple-200">
                <Sparkles className="w-4 h-4" />
                AI-Powered Career Intelligence
              </div>
            </motion.div>

            {/* TITLE (CLEAN + PREMIUM) */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 sm:mt-9 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              Your AI Career Coach

              <span className="block mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Platform for Smarter Job Prep
              </span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 sm:mt-7 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Analyze resumes, identify skill gaps, and build personalized career roadmaps with AI designed for real-world job success.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/upload" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-[1.03] transition-all shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 font-semibold">
                  Analyze Resume
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-xl font-semibold">
                  Open Dashboard
                </button>
              </Link>
            </motion.div>

            {/* SOCIAL PROOF */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-9 flex flex-col sm:flex-row items-center lg:items-start gap-5"
            >
              <div className="flex -space-x-3">
                {["SH", "MJ", "LK", "AD"].map((item) => (
                  <div
                    key={item}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border border-black/40 flex items-center justify-center text-xs font-bold"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-300">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <span className="text-sm text-center sm:text-left">
                  Built for students & job seekers
                </span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >

            {/* SOFTER GLOW */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />

            {/* MAIN CARD */}
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl">

              <img
                src={heroImage}
                alt="AI Career Platform"
                className="rounded-2xl w-full object-cover"
              />

              {/* FLOAT CARD 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="hidden md:block absolute -left-6 top-14 bg-black/60 border border-white/10 backdrop-blur-xl rounded-2xl p-4"
              >
                <p className="text-xs text-gray-400">Resume Score</p>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  85/100
                </h3>
              </motion.div>

              {/* FLOAT CARD 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="hidden md:block absolute -right-6 bottom-12 bg-black/60 border border-white/10 backdrop-blur-xl rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Roadmap Ready
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  +6 Weeks Optimized Plan
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>



      {/* ================= FEATURES ================= */}
      <section className="relative z-10 py-23 px-6 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Platform Features
          </h2>
          <p className="text-gray-400 mt-3">
            Everything you need to improve your career with AI support.
          </p>
        </div>

        {/* FEATURES LIST */}
        <div className="space-y-8">

          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-white/10 pb-6"
              >

                {/* ICON */}
                <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </section>



      {/* ================= HOW IT WORKS ================= */}
      <section className="relative z-10 py-24 sm:py-28 px-4 sm:px-6">

        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-20">

            <h2 className="text-4xl sm:text-5xl font-black">
              How It Works
            </h2>

            <p className="text-gray-400 mt-4 text-sm sm:text-base">
              A complete AI-powered career improvement journey.
            </p>

          </div>

          {/* Timeline */}
          <div className="relative">

            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 transform sm:-translate-x-1/2" />

            <div className="space-y-14">

              {steps.map((step, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                >

                  {/* Circle */}
                  <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 border-4 border-black flex items-center justify-center z-10 shadow-2xl">

                    <step.icon className="w-6 h-6 text-white" />

                  </div>

                  {/* Content */}
                  <div
                    className={`ml-24 sm:ml-0 w-full sm:w-[45%] bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 ${i % 2 === 0
                      ? "sm:mr-auto"
                      : "sm:ml-auto"
                      }`}
                  >

                    <span className="text-sm text-purple-400 font-semibold">
                      STEP 0{i + 1}
                    </span>

                    <h3 className="text-2xl font-bold mt-2 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>




      {/* ================= PLATFORM HIGHLIGHTS ================= */}
      <section className="relative z-10 py-23 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">

          <h2 className="text-4xl sm:text-5xl font-black">
            Why Choose This Platform
          </h2>

          <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Designed to provide a complete AI-powered career development experience
            using intelligent analysis, personalized recommendations, and interactive preparation tools.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300"
          >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-transparent" />

            <div className="relative z-10">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-purple-400" />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Intelligent AI Analysis
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm">
                Advanced AI models analyze resumes, detect skills, identify missing areas,
                and generate personalized career insights automatically.
              </p>

            </div>

          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300"
          >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-500/10 to-transparent" />

            <div className="relative z-10">

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <Map className="w-7 h-7 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Personalized Learning Roadmaps
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm">
                Dynamic AI-generated learning plans help users improve weak skills
                through structured weekly career development guidance.
              </p>

            </div>

          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300"
          >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-transparent" />

            <div className="relative z-10">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Mic className="w-7 h-7 text-blue-400" />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Realistic Interview Preparation
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm">
                Interactive AI interview simulations prepare users for technical,
                HR, behavioral, and real-world interview scenarios.
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= FAQ ================= */}
      <section className="relative z-10 py-28 px-6 max-w-4xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black">
            FAQ
          </h2>

        </div>

        <div className="space-y-4">

          {faqs.map((faq, i) => {

            const open = faqOpen === i;

            return (

              <div
                key={i}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden"
              >

                <button
                  onClick={() => setFaqOpen(open ? null : i)}
                  className="w-full flex items-center justify-between p-8 hover:bg-white/5 transition"
                >

                  <h3 className="text-left font-bold text-lg">
                    {faq.q}
                  </h3>

                  <ChevronDown
                    className={`transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />

                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >

                  <p className="px-8 pb-8 text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>

                </motion.div>

              </div>

            );
          })}

        </div>

      </section>

    </div>
  );
}