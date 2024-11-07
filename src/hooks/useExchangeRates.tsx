import { useState, useEffect } from 'react';
import { format, eachDayOfInterval } from 'date-fns';
import { ExchangeRate, DateRange, ApiResponse } from '../types/exchangeRate.types';
import { exchangeRateCache } from '../services/cache';
// Cache for API responses
const cache = new Map<string, ExchangeRate>();

interface UseExchangeRatesResult {
  rates: ExchangeRate[];
  isLoading: boolean;
  error: string | null;
}

export const useExchangeRates = (dateRange: DateRange): UseExchangeRatesResult => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const dates: Date[] = eachDayOfInterval({
          start: dateRange.startDate,
          end: dateRange.endDate
        });

        const ratesPromises = dates.map(async (date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          
          const cachedData = exchangeRateCache.get(formattedDate);
          if (cachedData) {
            return cachedData;
          }
          const response = await fetch(
            `https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${process.env.REACT_APP_EXCHANGE_RATE_APP_ID}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
          }

          const data: ApiResponse = await response.json();
          const result: ExchangeRate = {
            date: formattedDate,
            rate: data.rates.ILS
          };

          exchangeRateCache.set(formattedDate, result);
          return result;
        });

        const results = await Promise.all(ratesPromises);
        setRates(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [dateRange]);

  return { rates, isLoading, error };
};