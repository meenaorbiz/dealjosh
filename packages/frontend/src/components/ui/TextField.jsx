import React from 'react';

const TextField = ({ label, error, className = '', ...props }) => {
  return (
    <div className="dj-form-group">
      {label && <label className="dj-label">{label}</label>}
      <input
        className={`dj-input ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
};

export default TextField;