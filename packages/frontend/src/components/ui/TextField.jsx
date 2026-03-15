import React from 'react';

const TextField = ({ label, error, className = '', ...props }) => {
  return (
    <div className="dj-form-group w-full text-left">
      {/* Label - Uses the standardized dj-label style */}
      {label && <label className="dj-label block mb-2">{label}</label>}
      
      <input
        className={`dj-input w-full ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} ${className}`}
        {...props}
      />
      
      {/* Error Message - Standardized placement */}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1 px-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;