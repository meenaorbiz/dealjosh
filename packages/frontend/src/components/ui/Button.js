import React from 'react';

export const Button = ({ 
  label, 
  onClick, 
  type = "button", 
  variant = "primary", // primary, secondary, outline
  loading = false, 
  disabled = false,
  fullWidth = false 
}) => {
  const baseClass = `dj-btn dj-btn-${variant}`;
  const widthClass = fullWidth ? 'dj-btn-full' : '';

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled || loading}
      className={`${baseClass} ${widthClass}`}
    >
      {loading ? (
        <span className="spinner">⌛ Saving...</span>
      ) : (
        label
      )}
    </button>
  );
};