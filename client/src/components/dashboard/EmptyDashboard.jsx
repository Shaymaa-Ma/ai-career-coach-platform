import React from "react";
import { Link } from "react-router-dom";
import { UploadCloud } from "lucide-react";

export default function EmptyDashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-6 pt-28 sm:pt-32 pb-12 text-white">

      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-9 text-center shadow-2xl">

          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <UploadCloud className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
            No Resume Yet
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-base mb-7 leading-relaxed">
            Upload your resume to unlock AI insights, career roadmap,
            and interview preparation tools.
          </p>

          {/* Button */}
          <Link
            to="/upload"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300"
          >
            Upload Resume
          </Link>

        </div>
      </div>
    </div>
  );
}