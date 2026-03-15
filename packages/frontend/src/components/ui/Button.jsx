import React from 'react';

export const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  loading = false, 
  disabled = false, 
  onClick,
  className = "" 
}) => {
  // Centralized "Josh" Styles
  const baseStyles = "dj-btn h-14 w-full text-lg shadow-md transition-all duration-200 active:scale-[0.98]";
  
  const variants = {
    primary: "dj-btn-primary", // Uses the Gold/Orange gradient from index.css
    outline: "border-2 border-gray-200 text-gray-600 bg-transparent",
    ghost: "text-gray-400 bg-transparent"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="spinner" /> {/* From your index.css */}
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};