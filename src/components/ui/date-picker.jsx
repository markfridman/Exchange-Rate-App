import React from 'react';

export const DatePicker = ({ selected, onChange, minDate, maxDate, placeholderText, className }) => {
  return (
    <input
      type="date"
      value={selected ? selected.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(new Date(e.target.value))}
      min={minDate ? minDate.toISOString().split('T')[0] : undefined}
      max={maxDate ? maxDate.toISOString().split('T')[0] : undefined}
      placeholder={placeholderText}
      className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
    />
  );
};