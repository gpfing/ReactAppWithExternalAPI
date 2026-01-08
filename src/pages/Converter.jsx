import { useState, useEffect } from 'react';
import currencyService from '../services/currencyService';
import { formatCurrency, getCurrencyName, saveConversionHistory, getConversionHistory } from '../utils/currencyUtils';
import './Converter.css';

function Converter() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);

  useEffect(() => {
    loadCurrencies();
    loadRecentConversions();
  }, []);

  useEffect(() => {
    if (fromCurrency) {
      loadRates();
    }
  }, [fromCurrency]);

  const loadCurrencies = async () => {
    try {
      const currencyList = await currencyService.getSupportedCurrencies();
      setCurrencies(currencyList);
    } catch (err) {
      console.error('Error loading currencies:', err);
    }
  };

  const loadRates = async () => {
    try {
      const data = await currencyService.getLatestRates(fromCurrency);
      setRates(data.rates);
    } catch (err) {
      console.error('Error loading rates:', err);
    }
  };

  const loadRecentConversions = () => {
    const history = getConversionHistory();
    setRecentConversions(history.slice(0, 10));
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      const conversionResult = await currencyService.convertCurrency(
        numAmount,
        fromCurrency,
        toCurrency
      );

      setResult(conversionResult);
      saveConversionHistory(conversionResult);
      loadRecentConversions(); // Refresh recent conversions
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const getQuickConversion = (currency) => {
    if (!rates || !rates[currency]) return 'N/A';
    const rate = rates[currency];
    return `1 ${fromCurrency} = ${rate.toFixed(4)} ${currency}`;
  };

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  return (
    <div className="converter">
      <div className="converter-header">
        <h1>Currency Converter</h1>
        <p>Convert between different currencies with real-time rates</p>
      </div>

      <div className="converter-card">
        <form onSubmit={handleConvert} className="converter-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="currency-selector-group">
            <div className="form-group">
              <label htmlFor="from-currency">From</label>
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} - {getCurrencyName(currency)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="swap-button"
              onClick={swapCurrencies}
              title="Swap currencies"
            >
              ⇄
            </button>

            <div className="form-group">
              <label htmlFor="to-currency">To</label>
              <select
                id="to-currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} - {getCurrencyName(currency)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="convert-button" disabled={loading}>
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result-card">
            <div className="result-header">Conversion Result</div>
            <div className="result-content">
              <div className="result-from">
                <span className="result-label">From</span>
                <span className="result-amount">
                  {formatCurrency(result.amount, result.from)} {result.from}
                </span>
              </div>
              <div className="result-arrow">→</div>
              <div className="result-to">
                <span className="result-label">To</span>
                <span className="result-amount highlight">
                  {formatCurrency(result.convertedAmount, result.to)} {result.to}
                </span>
              </div>
            </div>
            <div className="result-rate">
              Exchange Rate: 1 {result.from} = {result.rate.toFixed(4)} {result.to}
            </div>
            <div className="result-date">
              Last updated: {new Date(result.date).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>

      {rates && (
        <div className="quick-rates">
          <h3>Quick Reference Rates (Base: {fromCurrency})</h3>
          <div className="rates-grid">
            {popularCurrencies
              .filter((c) => c !== fromCurrency)
              .map((currency) => (
                <div key={currency} className="rate-card">
                  <div className="rate-currency">{currency}</div>
                  <div className="rate-value">{getQuickConversion(currency)}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {recentConversions.length > 0 && (
        <div className="recent-conversions">
          <h3>Recent Conversions</h3>
          <div className="conversions-list">
            {recentConversions.map((item, index) => (
              <div key={index} className="conversion-item">
                <div className="conversion-time">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div className="conversion-details">
                  <span className="conversion-from">
                    {formatCurrency(item.amount, item.from)} {item.from}
                  </span>
                  <span className="conversion-arrow">→</span>
                  <span className="conversion-to">
                    {formatCurrency(item.convertedAmount, item.to)} {item.to}
                  </span>
                </div>
                <div className="conversion-rate-small">
                  1 {item.from} = {item.rate.toFixed(4)} {item.to}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Converter;
