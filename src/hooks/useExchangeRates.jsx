import { useState, useEffect } from 'react';
import { format, eachDayOfInterval } from 'date-fns';

const cache = new Map();

const APP_ID = '42dc32aec9e743178baae8012688af6c';

export const useExchangeRates = (dateRange) => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const dates = eachDayOfInterval({
          start: dateRange.startDate,
          end: dateRange.endDate
        });

        const ratesPromises = dates.map(async (date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          
          if (cache.has(formattedDate)) {
            return cache.get(formattedDate);
          }

          const response = await fetch(
            `https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${APP_ID}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
          }

          const data = await response.json();
          const result = {
            date: formattedDate,
            rate: data.rates.ILS
          };

          // Cache the result
          cache.set(formattedDate, result);
          return result;
        });

        const results = await Promise.all(ratesPromises);
        setRates(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [dateRange]);

  return { rates, isLoading, error };
};
