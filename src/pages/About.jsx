import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Currency Converter</h1>
        <p>Learn more about our application and the technology behind it</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="section-icon">⚙️</div>
          <h2>Technologies Used</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <strong>React 18</strong>
              <span>Modern UI library with hooks</span>
            </div>
            <div className="tech-item">
              <strong>React Router</strong>
              <span>Client-side routing</span>
            </div>
            <div className="tech-item">
              <strong>Axios</strong>
              <span>HTTP client for API requests</span>
            </div>
            <div className="tech-item">
              <strong>Vite</strong>
              <span>Fast build tool and dev server</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-icon">✨</div>
          <h2>Features</h2>
          <ul className="features-list">
            <li>Real-time currency conversion between 150+ currencies</li>
            <li>Beautiful, responsive UI with dark theme</li>
            <li>Quick reference rates for popular currencies</li>
            <li>Recent conversions display with local storage persistence</li>
            <li>Swap currencies with one click</li>
            <li>Mobile-friendly responsive design</li>
            <li>Error handling and loading states</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
