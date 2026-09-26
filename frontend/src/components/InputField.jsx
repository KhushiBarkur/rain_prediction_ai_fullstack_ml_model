import React from 'react';

const InputField = ({ label, icon, unit, name, value, onChange }) => {
  // Define placeholders for each field to match your reference design
  const placeholders = {
    temp: "e.g. 24.5",
    humidity: "0-100",
    clouds: "0-100",
    pressure: "e.g. 1013"
  };

  return (
    <div className="input-field-container">
      <label className="input-label">
        <span>{icon}</span> {label}
      </label>
      <div className="input-control">
        <input
          type="text"
          inputMode="decimal"
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="styled-input"
          placeholder={placeholders[name] || "0.0"}
        />
        <span className="input-unit">{unit}</span>
      </div>
    </div>
  );
};

export default InputField;