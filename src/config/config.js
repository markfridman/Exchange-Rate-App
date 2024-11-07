const config = {
  apiUrl: process.env.REACT_APP_EXCHANGE_RATE_API_URL || 'https://openexchangerates.org/api',
  appId: process.env.REACT_APP_EXCHANGE_RATE_APP_ID,
  maxDateRange: process.env.REACT_APP_EXCHANGE_RATE_MAX_DATE_RANGE || 14
};

export default config;