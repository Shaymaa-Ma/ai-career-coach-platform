import React from "react";
import { AlertTriangle, Info, XCircle } from "lucide-react";
/**
 * RejectionCard Component

 * This component displays structured error and rejection feedback
 * when a resume cannot be processed by the system.
 
 * It receives validation or system error information from the backend
 * and presents clear, user-friendly explanations based on the rejection reason.
 
 * Supported Cases:
  - Resume validation failure (missing required sections)
  - Invalid file type
  - Server processing errors
 
 * Key Features:
  - Dynamic title generation based on error type
  - Context-aware icons for visual feedback
  - Helpful guidance for fixing resume issues
 *- Improves user experience by making rejection reasons clear and actionable
 
 * It acts as the validation feedback layer in the Resume Analyzer flow,
 * helping users understand why their resume was rejected
 * and what they need to improve before resubmitting.
 */

const RejectionCard = ({ error, reasonCode, onRetry }) => {

  const getTitle = () => {
    switch (reasonCode) {
      case "VALIDATION_FAILED":
        return "Resume Rejected (Validation Failed)";
      case "INVALID_FILE_TYPE":
        return "Invalid File Type";
      case "SERVER_ERROR":
        return "Server Error";
      default:
        return "Resume Rejected";
    }
  };

  const getIcon = () => {
    switch (reasonCode) {
      case "INVALID_FILE_TYPE":
        return <XCircle className="w-10 h-10 text-red-400" />;
      case "SERVER_ERROR":
        return <Info className="w-10 h-10 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-10 h-10 text-red-400" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-6 fade-in-up">

      <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6 text-center">

        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>

        <h3 className="text-xl font-bold text-red-300 mb-3">
          {getTitle()}
        </h3>

        <p className="text-gray-300 text-lg">
          {error}
        </p>

        {reasonCode === "VALIDATION_FAILED" && (
          <div className="mt-5 text-sm text-gray-400 space-y-1">
            <p>💡 Make sure your resume includes:</p>
            <p>• Experience section</p>
            <p>• Education section</p>
            <p>• Skills section</p>
            <p>• Contact information</p>
          </div>
        )}

        {reasonCode === "INVALID_FILE_TYPE" && (
          <p className="mt-4 text-sm text-gray-400">
            Only PDF or DOCX files are supported.
          </p>
        )}

        {/*  BUTTON */}
        <button
          onClick={onRetry}
          className="mt-6 bg-red-500/10 border border-red-500/40 text-red-300 px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all hover:bg-red-500/20"
        >
          Analyze Another File
        </button>

      </div>
    </div>
  );
};

export default RejectionCard;