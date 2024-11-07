import React from 'react';
import { DatePicker } from '../ui/date-picker';
import { DateRange } from '../../types/exchangeRate.types';

interface DateRangePickerProps {
  dateRange: DateRange;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  maxEndDate: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
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
        minDate={new Date(-8640000000000000)}
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