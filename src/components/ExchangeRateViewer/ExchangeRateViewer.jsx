import React, { useState, useCallback, useMemo } from 'react';
import { format, subDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { DateRangePicker } from './DateRangePicker';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { LoadingSpinner } from './LoadingSpinner';

const ExchangeRateViewer = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 14),
    endDate: new Date()
  });

  const { rates, isLoading, error } = useExchangeRates(dateRange);

  const chartData = useMemo(() => {
    if (!rates.length) return [];
    
    return rates.map((rate, index) => {
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

  const handleDateRangeChange = useCallback((newRange) => {
    const daysDiff = Math.abs(
      (newRange.endDate.getTime() - newRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 14) {
      setDateRange(newRange);
    } else {
      alert('Please select a date range of 14 days or less');
    }
  }, []);

  if (error) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="text-red-600">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>USD to ILS Exchange Rate History</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6">
            <LineChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" domain={['auto', 'auto']} />
              <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                formatter={(value) => [Number(value).toFixed(3)]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rate"
                stroke="#8884d8"
                name="Exchange Rate"
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentChange"
                stroke="#82ca9d"
                name="% Change"
                dot={{ r: 4 }}
              />
            </LineChart>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExchangeRateViewer;
