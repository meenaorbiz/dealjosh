import React from 'react';

export const Button = ({ children, className = '', variant = 'primary', loading, ...props }) => (
  <button 
    className={`dj-btn ${variant === 'primary' ? 'dj-btn-primary' : 'dj-btn-secondary'} dj-btn-full ${className}`} 
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? <div className="spinner"></div> : children}
  </button>
);