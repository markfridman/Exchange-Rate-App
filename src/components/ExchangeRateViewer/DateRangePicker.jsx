import React from 'react';
import { DatePicker } from '../ui/date-picker';

export const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <DatePicker
        selected={dateRange.startDate}
        onChange={(date) => onDateRangeChange({
          ...dateRange,
          startDate: date
        })}
        maxDate={dateRange.endDate}
        placeholderText="Start Date"
      />
      <span>to</span>
      <DatePicker
        selected={dateRange.endDate}
        onChange={(date) => onDateRangeChange({
          ...dateRange,
          endDate: date
        })}
        minDate={dateRange.startDate}
        maxDate={new Date()}
        placeholderText="End Date"
      />
    </div>
  );
};