import React, { useState, useCallback, useMemo } from 'react';
import { format, subDays, addDays, isBefore, isAfter } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { DateRangePicker } from './DateRangePicker';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { LoadingSpinner } from './LoadingSpinner';
import { DateRange, ChartDataPoint } from '../../types/exchangeRate.types';

const MAX_DATE_RANGE_DAYS = 14;

const ExchangeRateViewer: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: subDays(new Date(), MAX_DATE_RANGE_DAYS),
    endDate: new Date()
  });

  const { rates, isLoading, error } = useExchangeRates(dateRange);

  const handleDateRangeChange = useCallback((newDate: Date, isStartDate: boolean): void => {
    const today = new Date();
    
    setDateRange(prevRange => {
      let newStartDate = prevRange.startDate;
      let newEndDate = prevRange.endDate;

      if (isStartDate) {
        newStartDate = newDate;
        const potentialEndDate = addDays(newStartDate, MAX_DATE_RANGE_DAYS - 1);
        
        if (isAfter(prevRange.endDate, potentialEndDate)) {
          newEndDate = potentialEndDate;
          
          if (isAfter(newEndDate, today)) {
            newEndDate = today;
            newStartDate = subDays(today, MAX_DATE_RANGE_DAYS - 1);
          }
        }
      } else {
        newEndDate = isAfter(newDate, today) ? today : newDate;
        const potentialStartDate = subDays(newEndDate, MAX_DATE_RANGE_DAYS - 1);
        
        if (isBefore(prevRange.startDate, potentialStartDate)) {
          newStartDate = potentialStartDate;
        }
      }

      return {
        startDate: newStartDate,
        endDate: newEndDate
      };
    });
  }, []);

  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!rates.length) return [];
    
    return rates.map((rate: any, index: number) => {
      const percentChange = index > 0
        ? ((rate.rate - rates[index - 1].rate) / rates[index - 1].rate) * 100
        : 0;
      
      return {
        date: format(new Date(rate.date), 'MMM dd'),
        rate: rate.rate,
        percentChange: Number(percentChange.toFixed(2))
      };
    });
  }, [rates]);

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-600">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>USD to ILS Exchange Rate History</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <DateRangePicker
          dateRange={dateRange}
          onStartDateChange={(date: Date) => handleDateRangeChange(date, true)}
          onEndDateChange={(date: Date) => handleDateRangeChange(date, false)}
          maxEndDate={new Date()}
        />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6">
            <LineChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rate"
                stroke="#8884d8"
                name="Exchange Rate"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentChange"
                stroke="#82ca9d"
                name="% Change"
              />
            </LineChart>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExchangeRateViewer;
