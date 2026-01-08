import { useState, useEffect } from 'react';
import { getConversionHistory, clearConversionHistory, formatCurrency } from '../utils/currencyUtils';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getConversionHistory();
    setHistory(data);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearConversionHistory();
      loadHistory();
    }
  };

  const getFilteredHistory = () => {
    if (filter === 'all') return history;
    return history.filter(item => item.from === filter || item.to === filter);
  };

  const uniqueCurrencies = [...new Set(history.flatMap(item => [item.from, item.to]))].sort();

  const filteredHistory = getFilteredHistory();

  return (
    <div className="history">
      <div className="history-header">
        <h1>Conversion History</h1>
        <p>View your recent currency conversions</p>
      </div>

      {history.length > 0 && (
        <div className="history-controls">
          <div className="filter-group">
            <label htmlFor="currency-filter">Filter by currency:</label>
            <select
              id="currency-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Currencies</option>
              {uniqueCurrencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <button onClick={handleClearHistory} className="clear-button">
            Clear History
          </button>
        </div>
      )}

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2>No Conversion History</h2>
          <p>Your conversion history will appear here after you convert currencies.</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredHistory.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-item-header">
                <span className="history-date">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="history-item-content">
                <div className="history-from">
                  <span className="currency-label">{item.from}</span>
                  <span className="amount-value">
                    {formatCurrency(item.amount, item.from)}
                  </span>
                </div>
                <div className="history-arrow">→</div>
                <div className="history-to">
                  <span className="currency-label">{item.to}</span>
                  <span className="amount-value highlight">
                    {formatCurrency(item.convertedAmount, item.to)}
                  </span>
                </div>
              </div>
              <div className="history-rate">
                Rate: 1 {item.from} = {item.rate.toFixed(4)} {item.to}
              </div>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="history-stats">
          <div className="stat-card">
            <div className="stat-value">{history.length}</div>
            <div className="stat-label">Total Conversions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{uniqueCurrencies.length}</div>
            <div className="stat-label">Currencies Used</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
