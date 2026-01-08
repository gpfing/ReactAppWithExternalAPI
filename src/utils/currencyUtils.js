// Currency symbols mapping
export const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr',
  CNY: '¥',
  INR: '₹',
  MXN: '$',
  BRL: 'R$',
  ZAR: 'R',
  RUB: '₽',
  KRW: '₩',
  SGD: 'S$',
  NZD: 'NZ$',
  TRY: '₺',
  HKD: 'HK$',
  NOK: 'kr',
  SEK: 'kr'
};

// Currency names mapping
export const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  MXN: 'Mexican Peso',
  BRL: 'Brazilian Real',
  ZAR: 'South African Rand',
  RUB: 'Russian Ruble',
  KRW: 'South Korean Won',
  SGD: 'Singapore Dollar',
  NZD: 'New Zealand Dollar',
  TRY: 'Turkish Lira',
  HKD: 'Hong Kong Dollar',
  NOK: 'Norwegian Krone',
  SEK: 'Swedish Krona'
};

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency) => {
  const symbol = currencySymbols[currency] || '';
  return `${symbol}${amount.toFixed(2)}`;
};

/**
 * Get currency display name
 * @param {string} code - Currency code
 * @returns {string} Display name
 */
export const getCurrencyName = (code) => {
  return currencyNames[code] || code;
};

/**
 * Save conversion to local storage
 * @param {object} conversion - Conversion data
 */
export const saveConversionHistory = (conversion) => {
  try {
    const history = getConversionHistory();
    const newEntry = {
      ...conversion,
      timestamp: new Date().toISOString()
    };
    history.unshift(newEntry);
    
    // Keep only last 20 conversions
    const trimmedHistory = history.slice(0, 20);
    localStorage.setItem('conversionHistory', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving conversion history:', error);
  }
};

/**
 * Get conversion history from local storage
 * @returns {Array} Conversion history
 */
export const getConversionHistory = () => {
  try {
    const history = localStorage.getItem('conversionHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading conversion history:', error);
    return [];
  }
};

/**
 * Clear conversion history
 */
export const clearConversionHistory = () => {
  try {
    localStorage.removeItem('conversionHistory');
  } catch (error) {
    console.error('Error clearing conversion history:', error);
  }
};
