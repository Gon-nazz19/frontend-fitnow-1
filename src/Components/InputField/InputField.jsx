// InputField.jsx
import React from 'react';
import './InputField.css';

function InputField({ label, type, placeholder, options, value, onChange, name }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      {type === 'select' ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          autocomplete={type === 'password' ? 'current-password' : 'on'}
        />
      )}
    </div>
  );
}

export default InputField;