import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">💱</span>
          <h1>Currency Converter</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/converter" className={isActive('/converter')}>
              Converter
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about')}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
