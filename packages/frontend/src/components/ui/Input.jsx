import React from 'react';

export const Input = ({ label, type = 'text', error, ...props }) => (
  <div className="dj-form-group">
    {label && <label className="dj-label">{label}</label>}
    <input
      type={type}
      className={`dj-input ${error ? 'border-red-500' : ''}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);