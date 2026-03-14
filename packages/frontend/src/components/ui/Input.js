import React from 'react';

const Input = ({ label, name, value, onChange, placeholder, type = "text", required = false }) => (
  <div className="dj-form-group">
    {label && <label className="dj-label">{label}</label>}
    <input 
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="dj-input"
    />
  </div>
);

export default Input;