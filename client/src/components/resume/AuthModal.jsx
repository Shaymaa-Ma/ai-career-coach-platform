import React from 'react';
// Import lock icon to visually represent authentication/security
import { Lock } from 'lucide-react';
import { Link } from "react-router-dom";

/**
 * AuthModal Component:
 * This component displays a full-screen authentication modal
 * when the user is not logged in.
 * 
 * Purpose:
 * - Inform the user that login is required
 * - Provide a button to simulate/login 
 * 
 * Props:
 * - isAuthenticated: current authentication state (not used inside, but passed for logic control)
 * - onToggleAuth: function triggered when user clicks login button
 */
const AuthModal = ({ isAuthenticated, onToggleAuth }) => {
 return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 text-white">

    {/* Background Effects */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
    </div>

    {/* Card */}
    <div className="relative z-10 w-full max-w-sm">

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-7 sm:p-8 text-center">

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
          <Lock className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Login Required
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7">
          Please login first to access AI resume analysis and career tools.
        </p>

        {/* Button */}
        <Link
          to="/auth"
          className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 px-6 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300"
        >
          Continue to Login
        </Link>

      </div>
    </div>
  </div>
);
};

export default AuthModal;
