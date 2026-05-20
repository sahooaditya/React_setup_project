import { Link } from "react-router-dom";
import "./home.css";
import Container from "../../components/common/Container";
import Space from "../../components/common/space";

const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="tag">🔥 Modern React Dashboard</span>

          <h1>
            Build Faster <br />
            Manage Smarter
          </h1>

          <p>
            A modern responsive dashboard application built with React, Redux Toolkit, TypeScript
            and beautiful UI.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Get Started
            </Link>

            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="hero" />
        </div>
      </section>

      {/* FEATURES */}

      <section className="features">
        <Container>
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>Everything you need to build scalable modern applications.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>Optimized architecture for smooth and fast user experience.</p>
            </div>

            <div className="feature-card">
              <div className="icon">🔒</div>
              <h3>Secure Access</h3>
              <p>Role-based authentication with protected routing system.</p>
            </div>

            <div className="feature-card">
              <div className="icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Fully responsive layout working perfectly on all devices.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Space custom={100} />
      <Container>
        <section className="stats">
          <div className="stat-card">
            <h2>10K+</h2>
            <p>Active Users</p>
          </div>

          <div className="stat-card">
            <h2>99%</h2>
            <p>Performance</p>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <p>Support</p>
          </div>

          <div className="stat-card">
            <h2>100+</h2>
            <p>Projects</p>
          </div>
        </section>
      </Container>
      <Space custom={100} />
      {/* CTA */}

      <section className="cta">
        <h2>Ready to Start Your Journey?</h2>

        <p>Join thousands of developers building modern applications.</p>

        <Link to="/login" className="cta-btn">
          Login Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
