import React, { useRef } from "react";
import { Upload } from "lucide-react";

/**
 * UploadSection Component
 * 
 * This component provides the user interface for uploading resumes.
 * It supports both drag-and-drop and manual file selection using a hidden input field.
 
 * Key Features:
  - Drag & drop file upload handling
  - Click-to-upload functionality using React ref
  - Supports PDF, DOC, and DOCX file formats
  - Prevents duplicate trigger events for better UX
  - Clean, interactive UI with hover effects and animations
 
 * It acts as the entry point of the Resume Analyzer flow,
 * allowing users to securely select and submit their resume
 * for processing and AI analysis.
 */
const UploadSection = ({ onFileSelect, handleDragOver, handleDrop }) => {

  // React way instead of document.getElementById
  const fileInputRef = useRef(null);

  // Open file picker
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) onFileSelect(file);

  e.target.value = null; // allows re-selecting same file
};

   return (
    <section className="w-full px-4 sm:px-6 lg:px-0 flex justify-center">

      <div
        className="
          group relative w-full
          max-w-md sm:max-w-lg lg:max-w-xl

          bg-black/30 backdrop-blur-xl
          border-2 border-dashed border-white/15
          hover:border-blue-500/60

          rounded-2xl sm:rounded-3xl

          p-6 sm:p-8 lg:p-8

          text-center cursor-pointer

          transition-all duration-500
          hover:shadow-2xl hover:shadow-blue-500/20
          hover:scale-[1.01]

          mx-auto

          /* 🔥 KEY FIX: bring card UP closer to header */
          -mt-2 sm:-mt-4 lg:-mt-6

          /* 🔥 KEY FIX: prevent footer overlap */
          mb-10 sm:mb-12 lg:mb-14
        "
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10 blur-xl" />

        <div className="relative flex flex-col items-center">

          {/* Icon */}
          <Upload className="
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            text-gray-400
            group-hover:text-blue-400
            transition-all duration-300
            mb-4
          " />

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
            Upload your resume
          </h3>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md">
            Drag & drop or choose a file
          </p>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="
              w-full sm:w-auto
              px-6 py-3

              rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600

              font-semibold text-white text-sm

              shadow-lg shadow-blue-500/20
              hover:shadow-xl hover:shadow-blue-500/40
              hover:scale-105

              transition-all duration-300
            "
          >
            Choose File
          </button>

          <p className="mt-4 text-xs text-gray-500">
            Supported formats: PDF, DOC, DOCX
          </p>

        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
};

export default UploadSection;