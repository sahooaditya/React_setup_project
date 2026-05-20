import { useEffect, useState } from "react";
import "./cookieConsent.css";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h3>🍪 Cookie Consent</h3>

        <p>We use cookies to improve your experience, analyze traffic, and personalize content.</p>

        <div className="cookie-actions">
          <button className="accept-btn" onClick={handleAccept}>
            Accept All
          </button>

          <button className="reject-btn" onClick={handleReject}>
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
