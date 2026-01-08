import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Currency Converter</span>
          </h1>
          <p className="hero-description">
            Convert currencies instantly with real-time exchange rates.
            Fast, reliable, and easy to use.
          </p>
          <Link to="/converter" className="cta-button">
            Start Converting →
          </Link>
        </div>
        <div className="hero-graphic">
          <div className="currency-icon">💱</div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-icon">🎯</div>
        <h2>Project Overview</h2>
        <p>
          This Currency Converter application is a modern, responsive web app built with React
          that allows users to convert between different world currencies using real-time
          exchange rates. It demonstrates best practices in React development, including
          component composition, state management, and API integration.
        </p>
      </section>

      <section className="content-section api-section">
        <div className="section-icon">🌐</div>
        <h2>API Information</h2>
        <div className="api-info">
          <h3>Primary API: Fixer.io</h3>
          <p>
            <strong>Endpoint:</strong> <code>https://api.fixer.io/latest</code>
          </p>
          <p>
            <strong>Description:</strong> Fixer provides real-time foreign exchange rates
            for 170+ world currencies. The API is powered by data from financial institutions
            and banks.
          </p>
          <p>
            <strong>Note:</strong> Fixer requires an API key. For development without a key,
            the app falls back to ExchangeRate-API, a free alternative.
          </p>
          
          <h3 className="fallback-api">Fallback API: ExchangeRate-API</h3>
          <p>
            <strong>Endpoint:</strong> <code>https://api.exchangerate-api.com/v4/latest</code>
          </p>
          <p>
            <strong>Description:</strong> Free exchange rate API with no authentication required.
            Provides reliable currency conversion data for development and testing.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
