import React from 'react';

const Select = ({ label, name, value, options, onChange, required = false }) => (
  <div className="dj-form-group">
    {label && <label className="dj-label">{label}</label>}
    <select 
      name={name}
      className="dj-select" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default Select;