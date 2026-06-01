import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";
import AuthModal from "../components/resume/AuthModal";
import PageHeader from "../components/resume/PageHeader";
import UploadSection from "../components/resume/UploadSection";
import ProgressSection from "../components/resume/ProgressSection";
import ResultsSection from "../components/resume/ResultsSection";
import RejectionCard from "../components/resume/RejectionCard";
import { AlertCircle } from "lucide-react";

/**
 * ResumeUpload Component
 
 * This is the main controller component for the AI Resume Analyzer feature.
 * It manages the full resume analysis workflow from upload to result display.
 
 * Responsibilities:
  - Handles authentication check (restricts access to logged-in users)
  - Manages application state (idle, uploading, processing, results, error, rejected)
  - Handles file selection, validation, and upload via API
  - Tracks upload progress using XMLHttpRequest
  - Processes server responses and error handling
  - Caches analysis results in localStorage for performance optimization
 
 * Workflow:
  1. User uploads a resume (PDF/DOCX)
  2. File is validated and sent to backend
  3. Upload progress is tracked and displayed
  4. AI processing state is shown
  5. Results are received and rendered
 
 * UI Composition:
  - AuthModal → shown if user is not authenticated
  - UploadSection → file selection UI
  - ProgressSection → upload + AI processing feedback
  - ResultsSection → final analysis dashboard
  - RejectionCard → validation error display
 
 * This component acts as the orchestration layer connecting
 * frontend UI, backend API, and AI-driven analysis results.
 */

const ResumeUpload = () => {
  const { isAuthenticated, token } = useAuth();

  const [state, setState] = useState("idle");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [reasonCode, setReasonCode] = useState(null);

  // ================= LOAD CACHE =================
  useEffect(() => {
    const savedResults = localStorage.getItem("resume_results");
    const savedTime = localStorage.getItem("resume_results_time");

    if (savedResults && savedTime) {
      const timeDiff = Date.now() - parseInt(savedTime);

      if (timeDiff < 5 * 60 * 1000) {
        try {
          setResults(JSON.parse(savedResults));
          setState("results");
          return;
        } catch { }
      }
    }

    localStorage.removeItem("resume_results");
    localStorage.removeItem("resume_results_time");
  }, []);

  // ================= RESET FUNCTION (NEW) =================
  const resetToUpload = () => {
    setState("idle");
    setFile(null);
    setResults(null);
    setError(null);
    setReasonCode(null);
    setProgress(0);
  };

  // ================= FILE UPLOAD =================
  const handleFileSelect = useCallback((file) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF or DOCX files are allowed.");
      setReasonCode("INVALID_FILE_TYPE");
      setState("error");
      return;
    }

    setFile(file);
    setError(null);
    setReasonCode(null);
    setProgress(0);
    setState("uploading");

    const formData = new FormData();
    formData.append("resume", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.open("POST", "http://localhost:5000/api/upload");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setState("processing");

        const data = xhr.response;

        setResults(data);
        localStorage.setItem("resume_results", JSON.stringify(data));
        localStorage.setItem("resume_results_time", Date.now().toString());

        setState("results");
      } else {
        const err = xhr.response;

        if (err?.rejected) {
          setError(err.error);
          setReasonCode(err.reasonCode || "VALIDATION_FAILED");
          setState("rejected");
        } else {
          setError(err?.error || "Server error");
          setReasonCode("UPLOAD_ERROR");
          setState("error");
        }
      }
    };

    xhr.onerror = () => {
      setError("Network error");
      setReasonCode("UPLOAD_ERROR");
      setState("error");
    };

    xhr.send(formData);
  }, [token]);

  // ================= DRAG DROP =================
  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // ================= AUTH =================
  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-1 pt-24 px-6">

        <PageHeader />

        {/* REJECTED */}
        {state === "rejected" && error && (
          <RejectionCard
            error={error}
            reasonCode={reasonCode}
            onRetry={resetToUpload}
          />
        )}

        {/* ERROR */}
        {state === "error" && error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6 text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-red-300 mb-2">
                Upload Failed
              </h3>
              <p className="text-gray-300">{error}</p>

              <button
                onClick={resetToUpload}
                className="mt-5 bg-red-500 px-6 py-2 rounded-xl font-bold"
              >
                Try Another File
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD */}
        {(state === "idle" || state === "error") && (
          <UploadSection
            onFileSelect={handleFileSelect}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        )}

        {/* PROGRESS */}
        {state === "uploading" && (
          <ProgressSection state="uploading" progress={progress} fileName={file?.name} />
        )}

        {state === "processing" && (
          <ProgressSection state="processing" />
        )}

        {/* RESULTS */}
        {state === "results" && results && (
          <ResultsSection
            results={results}
            onReset={resetToUpload}
          />
        )}

      </main>
    </div>
  );
};

export default ResumeUpload;