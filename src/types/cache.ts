import { ExchangeRate } from "./exchangeRate.types";

export interface CacheEntry {
  timestamp: number;
  data: ExchangeRate;
}

export interface CacheData {
  [key: string]: CacheEntry;
}