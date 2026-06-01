import React from 'react';
// Import loading spinner icon from lucide-react library
import { Loader2 } from 'lucide-react';
/**
 * ProgressSection Component
 * This component visualizes the current processing state of the resume upload flow.
 * It provides real-time feedback to the user during two key phases:
 
  1. Uploading Phase:
     - Displays file name and upload progress (0–100%)
     - Shows animated progress bar and loading indicator
 
  2. Processing Phase:
     - Indicates that the AI is analyzing the resume
     - Shows step-by-step animated hints (skills extraction, scoring, gap detection)
 
 * Features:
  - Dynamic UI based on system state
  - Smooth animations for better user experience
  - Clear feedback to reduce user uncertainty during waiting time
 
 * This component acts as the transition layer between file upload
 * and final AI results in the Resume Analyzer workflow.
 */

const ProgressSection = ({ state, progress, fileName }) => {

  // Uploading state UI
  if (state === 'uploading') {
    return (
      <section className="max-w-lg mx-auto min-h-[70vh] flex items-center justify-center pb-32 fade-in-up">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl shadow-blue-500/10">

          {/* Spinning icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 animate-spin-slow">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>

          {/* File name */}
          <h3 className="text-2xl font-bold mb-2">
            Uploading {fileName}
          </h3>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Info text */}
          <p className="text-gray-400">
            Securely uploading your resume...
          </p>
        </div>
      </section>
    );
  }


  // Processing state UI
  if (state === 'processing') {
    return (
      <section className="max-w-lg mx-auto min-h-[70vh] flex items-center justify-center pb-32 fade-in-up">

        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl shadow-blue-500/10">

          {/* Spinner */}
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-8">
            AI Analyzing Resume
          </h3>

          {/* Steps */}
          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
              <span className="text-sm text-gray-400">
                Extracting skills...
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="text-sm text-gray-400">
                Scoring experience...
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="text-sm text-gray-400">
                Finding Gaps...
              </span>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default ProgressSection;