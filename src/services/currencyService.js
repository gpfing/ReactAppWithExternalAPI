import axios from 'axios';

// Note: Fixer.io requires an API key. Free tier available at https://fixer.io/
// For development, you can use exchangerate-api.com as an alternative (no key required for basic usage)
// Or use a mock service for testing

const FIXER_API_KEY = import.meta.env.VITE_FIXER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.fixer.io/latest';

// Alternative free API (no key required)
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest';

class CurrencyService {
  constructor() {
    this.useFixerAPI = false; // Set to true if you have a Fixer API key
  }

  /**
   * Get latest exchange rates
   * @param {string} base - Base currency code (e.g., 'USD')
   * @returns {Promise} Exchange rates data
   */
  async getLatestRates(base = 'USD') {
    try {
      if (this.useFixerAPI && FIXER_API_KEY !== 'YOUR_API_KEY_HERE') {
        const response = await axios.get(BASE_URL, {
          params: {
            access_key: FIXER_API_KEY,
            base: base
          }
        });
        return response.data;
      } else {
        // Use free alternative API
        const response = await axios.get(`${EXCHANGE_RATE_API_URL}/${base}`);
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to fetch exchange rates. Please try again later.');
    }
  }

  /**
   * Convert amount from one currency to another
   * @param {number} amount - Amount to convert
   * @param {string} from - Source currency code
   * @param {string} to - Target currency code
   * @returns {Promise} Conversion result
   */
  async convertCurrency(amount, from, to) {
    try {
      const data = await this.getLatestRates(from);
      
      if (!data.rates || !data.rates[to]) {
        throw new Error(`Currency ${to} not found`);
      }

      const rate = data.rates[to];
      const convertedAmount = amount * rate;

      return {
        from,
        to,
        amount,
        convertedAmount,
        rate,
        date: data.date
      };
    } catch (error) {
      console.error('Error converting currency:', error);
      throw error;
    }
  }

  /**
   * Get list of supported currencies
   * @returns {Promise} List of currency codes
   */
  async getSupportedCurrencies() {
    try {
      const data = await this.getLatestRates('USD');
      return Object.keys(data.rates).sort();
    } catch (error) {
      console.error('Error fetching currencies:', error);
      // Return common currencies as fallback
      return ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN'];
    }
  }
}

export default new CurrencyService();
