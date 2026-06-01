import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHero({ data }) {
  const { currentUser } = useAuth();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 md:p-7 shadow-2xl shadow-blue-500/10">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10" />

      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
          Welcome back, {currentUser?.name} 👋
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Your AI-powered career dashboard tracks resume performance,
          skill growth, and career readiness.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">

          <div className="px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-gray-400">Detected Role</p>
            <p className="font-bold text-blue-400 text-sm">
              {data.role}
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-xs text-gray-400">Career Readiness</p>
            <p className="font-bold text-indigo-400 text-sm">
              {data.overallScore}%
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}