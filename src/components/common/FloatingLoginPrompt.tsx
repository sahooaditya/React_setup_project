import { useState } from "react";
import { FiLogIn, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./floatingLoginPrompt.css";

const FloatingLoginPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated || !isVisible || location.pathname === "/login") {
    return null;
  }

  return (
    <aside className="floating-login-prompt" aria-label="Login prompt">
      <button
        className="floating-login-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close login prompt"
      >
        <FiX />
      </button>

      <div className="floating-login-icon">
        <FiLogIn />
      </div>

      <div className="floating-login-content">
        <span>Welcome back</span>
        <h3>Log in to access your dashboard</h3>
        <p>Sign in to view your orders, cart, profile, and enjoy a secure checkout experienc.</p>
      </div>

      <Link to="/login" className="floating-login-btn">
        Login Now
      </Link>
    </aside>
  );
};

export default FloatingLoginPrompt;
