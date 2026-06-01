import React from "react";
import {
  Shield,
  Database,
  Brain,
  Lock,
  Share2,
  KeyRound,
  UserCheck,
  Mail
} from "lucide-react";

import "../styles/global.css";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)]" />

      <main className="relative z-10 pt-28 md:pt-32 pb-24 px-5 max-w-5xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-20">

          <Shield className="mx-auto text-purple-400 w-10 h-10 mb-4" />

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
            We protect your data while delivering AI-powered career insights,
            resume analysis, and personalized learning recommendations.
          </p>

          <p className="text-gray-600 text-sm mt-3">
            Last updated: May 2026
          </p>

        </section>

        {/* CONTENT (clean section style instead of cards) */}
        <div className="space-y-14 text-gray-300 leading-relaxed">

          {/* 1 */}
          <section className="border-l border-purple-500/40 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Database className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Data We Collect</h2>
            </div>

            <ul className="space-y-2 text-sm">
              <li>• Resume files (PDF / DOCX)</li>
              <li>• Account information (name, email)</li>
              <li>• AI skill extraction results</li>
              <li>• Chat interactions with AI Coach</li>
              <li>• Dashboard progress data</li>
            </ul>
          </section>

          {/* 2 */}
          <section className="border-l border-blue-500/40 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Brain className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">How We Use Data</h2>
            </div>

            <ul className="space-y-2 text-sm">
              <li>• AI resume analysis & skill extraction</li>
              <li>• Personalized learning roadmap generation</li>
              <li>• Career dashboard insights</li>
              <li>• Interview simulation & coaching</li>
              <li>• Progress tracking & recommendations</li>
            </ul>
          </section>

          {/* 3 */}
          <section className="border-l border-emerald-500/40 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold">Storage & Retention</h2>
            </div>

            <ul className="space-y-2 text-sm">
              <li>• Secure authentication system</li>
              <li>• Resume files processed securely</li>
              <li>• Dashboard history stored safely</li>
              <li>• Old inactive data may be removed</li>
            </ul>
          </section>

          {/* 4 */}
          <section className="border-l border-pink-500/40 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Share2 className="w-5 h-5 text-pink-400" />
              <h2 className="text-xl font-bold">Data Sharing</h2>
            </div>

            <ul className="space-y-2 text-sm">
              <li>• We do NOT sell personal data</li>
              <li>• We do NOT publish resumes</li>
              <li>• Only shared if legally required</li>
              <li>• Secure AI API processing only</li>
            </ul>
          </section>

          {/* SECURITY */}
          <section className="pt-6 border-t border-white/10">

            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold">Security Measures</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <div>• Encrypted HTTPS transfer</div>
              <div>• Secure authentication system</div>
              <div>• Protected AI processing</div>
              <div>• Role-based access control</div>
              <div>• No public resume exposure</div>
              <div>• Secure dashboard storage</div>
            </div>

          </section>

          {/* RIGHTS */}
          <section className="pt-6 border-t border-white/10">

            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold">Your Rights</h2>
            </div>

            <p className="text-sm text-gray-300">
              You can request deletion, export your data, or remove your account at any time.
              You have full control over your personal information and AI-generated insights.
            </p>

          </section>

        </div>

        {/* CONTACT */}
        <section className="text-center mt-20 pt-10 border-t border-white/10">

          <Mail className="mx-auto text-purple-400 w-8 h-8 mb-3" />

          <h3 className="text-lg font-bold">Privacy Contact</h3>

          <p className="text-gray-400 text-sm mt-1 break-all">
            privacy@aicareerplatform.com
          </p>

        </section>

      </main>
    </div>
  );
};

export default Privacy;