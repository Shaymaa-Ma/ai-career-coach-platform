import React from "react";
import {
  FileText,
  User,
  ShieldCheck,
  AlertTriangle,
  Ban,
  Mail
} from "lucide-react";

import "../styles/global.css";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_60%)]" />

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-4xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-20">

          <FileText className="mx-auto w-10 h-10 text-purple-400 mb-4" />

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <p className="text-gray-400 text-lg mt-6">
            Simple terms that explain how you can use our AI Career Platform responsibly.
          </p>

        </section>

        {/* CONTENT (DOCUMENT STYLE) */}
        <div className="space-y-14 text-gray-300 leading-relaxed">

          {/* SECTION 1 */}
          <section className="border-l-2 border-purple-500/50 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Eligibility</h2>
            </div>

            <p>
              You may use this platform if you are allowed to access online services in your country
              and agree to follow these terms. You are responsible for the accuracy of the information you provide.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="border-l-2 border-blue-500/50 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">Use of Services</h2>
            </div>

            <p>
              Our tools provide AI-based career support such as resume analysis, roadmap generation,
              and interview preparation. These outputs are for guidance and learning purposes only.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="border-l-2 border-emerald-500/50 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold">User Content</h2>
            </div>

            <p>
              You retain ownership of your uploaded resume and personal data.
              By using the platform, you allow us to process your content to generate AI insights.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="border-l-2 border-pink-500/50 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <AlertTriangle className="w-5 h-5 text-pink-400" />
              <h2 className="text-xl font-bold">Limitations</h2>
            </div>

            <p>
              We do not guarantee job placement or hiring success. AI-generated results are
              recommendations and may not always be fully accurate or complete.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="border-l-2 border-yellow-500/50 pl-6">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Ban className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold">Termination</h2>
            </div>

            <p>
              We may suspend or remove accounts that violate rules, misuse the platform,
              or attempt to disrupt system functionality or other users.
            </p>
          </section>

        </div>

        {/* CONTACT */}
        <section className="text-center mt-24 pt-10 border-t border-white/10">

          <Mail className="mx-auto text-purple-400 w-8 h-8 mb-3" />

          <h3 className="text-xl font-bold mb-2">Need Help?</h3>

          <p className="text-gray-400 text-sm">
            support@aicareercoach.com
          </p>

        </section>

      </main>
    </div>
  );
};

export default Terms;