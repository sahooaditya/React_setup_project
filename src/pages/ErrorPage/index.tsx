import { Link } from "react-router-dom";
import { FiArrowLeft, FiCompass, FiHome, FiSearch } from "react-icons/fi";
import "./error-page.css";

const ErrorPage = () => {
  return (
    <main className="error-page">
      <section className="error-shell">
        <div className="error-content">
          <span className="error-kicker">
            <FiCompass /> Route not found
          </span>

          <h1>404</h1>
          <h2>Looks like this page wandered off.</h2>
          <p>
            The page you are looking for does not exist, has moved, or the link may be broken.
          </p>

          <div className="error-actions">
            <Link to="/" className="error-primary">
              <FiHome /> Go Home
            </Link>
            <Link to="/product" className="error-secondary">
              <FiSearch /> Browse Products
            </Link>
          </div>
        </div>

        <div className="error-visual" aria-hidden="true">
          <div className="error-orbit one" />
          <div className="error-orbit two" />
          <div className="error-code-card">
            <span>status</span>
            <strong>404</strong>
            <p>Page unavailable</p>
          </div>
          <div className="error-route-card">
            <FiArrowLeft />
            <span>Return to a working route</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
