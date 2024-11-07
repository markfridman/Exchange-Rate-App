import { ExchangeRate } from '../types/exchangeRate.types';
import { CacheEntry, CacheData } from 'types/cache';

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_EXPIRY_HOURS = 24;


class ExchangeRateCache {
  private cache: CacheData;

  constructor() {
    this.cache = this.loadFromStorage();
  }

  private loadFromStorage(): CacheData {
    try {
      const storedCache = localStorage.getItem(CACHE_KEY);
      return storedCache ? JSON.parse(storedCache) : {};
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
      return {};
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  private isExpired(timestamp: number): boolean {
    const now = Date.now();
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
    return now - timestamp > expiryTime;
  }

  get(date: string): ExchangeRate | null {
    const cacheEntry: CacheEntry = this.cache[date];
    
    if (!cacheEntry) {
      return null;
    }

    if (this.isExpired(cacheEntry.timestamp)) {
      this.remove(date);
      return null;
    }

    return cacheEntry.data;
  }

  set(date: string, data: ExchangeRate): void {
    this.cache[date] = {
      timestamp: Date.now(),
      data
    };
    this.saveToStorage();
  }

  remove(date: string): void {
    delete this.cache[date];
    this.saveToStorage();
  }

  clear(): void {
    this.cache = {};
    localStorage.removeItem(CACHE_KEY);
  }
}

// Create a singleton instance
export const exchangeRateCache = new ExchangeRateCache();