export interface ExchangeRate {
  date: string;
  rate: number;
}

export interface ChartDataPoint {
  date: string;
  rate: number;
  percentChange: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ApiResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: {
    ILS: number;
    [key: string]: number;
  };
}
