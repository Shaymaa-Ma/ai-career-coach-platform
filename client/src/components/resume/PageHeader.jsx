import React from 'react';

/**
 * Static page header with AI Resume Analysis title and subtitle.
 * No props required.
 */
const PageHeader = () => {
  return (
    <div className="text-center mt-10 sm:mt-12 lg:mt-16 mb-10 sm:mb-14 lg:mb-16 px-4">
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-5 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
        AI Resume Analysis
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Upload your resume for instant AI-powered insights, skill scoring, and personalized recommendations
      </p>

    </div>
  );
};

export default PageHeader;
