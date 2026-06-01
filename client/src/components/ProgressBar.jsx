import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable animated progress bar component
 * Used in Roadmap, Dashboard, etc.
 * 
 * @param {number} progress - Percentage (0-100)
 * @param {string} color - Tailwind color class (blue, emerald, etc.)
 */
const ProgressBar = ({ progress, color = 'blue' }) => {
  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/10">
      <div 
        className={`h-3 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full shadow-lg relative overflow-hidden transition-all duration-1000 ease-out`}
        style={{ width: `${progress}%` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full animate-shimmer" />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  color: PropTypes.string
};

export default ProgressBar;
