import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-black/80 to-black/90 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-purple-500/10 py-12 md:py-16 px-4 md:px-8 text-center relative overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-xl -z-10" />

      <div className="relative max-w-5xl mx-auto">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 md:mb-6">
          AI Career Coach
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed opacity-90 px-2">
          Your ultimate AI companion for career growth, skill mastery, and landing dream jobs.
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-gray-400 mb-8 md:mb-10">

          <Link
            to="/about"
            className="px-3 md:px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm md:text-base"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="px-3 md:px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm md:text-base"
          >
            Contact
          </Link>

          <Link
            to="/privacy"
            className="px-3 md:px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm md:text-base"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="px-3 md:px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm md:text-base"
          >
            Terms
          </Link>

        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-xs md:text-sm tracking-wide px-2">
          © 2026 AI Career Coach Platform. All rights reserved. Built with ❤️
        </p>

      </div>
    </footer>
  );
}