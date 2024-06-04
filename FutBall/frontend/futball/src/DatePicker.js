import React from 'react';
import './DatePicker.css';

function DatePicker({ selectedDate, onDateChange }) {
  return (
    <div className='date-picker-bar'>
      <input
        type='date'
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className='date-picker-input'
      />
    </div>
  );
}

export default DatePicker;
