import React from 'react';
import { DatePicker } from '../ui/date-picker';

export const DateRangePicker = ({
  dateRange,
  onStartDateChange,
  onEndDateChange,
  maxEndDate
}) => {
  return (
    <div className="flex gap-4 items-center">
      <DatePicker
        selected={dateRange.startDate}
        onChange={onStartDateChange}
        maxDate={dateRange.endDate}
        placeholderText="Start Date"
        className="w-40"
      />
      <span>to</span>
      <DatePicker
        selected={dateRange.endDate}
        onChange={onEndDateChange}
        minDate={dateRange.startDate}
        maxDate={maxEndDate}
        placeholderText="End Date"
        className="w-40"
      />
    </div>
  );
};