import {
  FiBookOpen,
  FiCamera,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>MC</span>
            MyCompany
          </Link>
          <p>
            We build modern, responsive web applications with React, Redux, TypeScript, and clean
            user experiences.
          </p>

          <div className="social">
            <a href="/" aria-label="Website">
              <FiGlobe />
            </a>
            <a href="/" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="/" aria-label="Docs">
              <FiBookOpen />
            </a>
            <a href="/" aria-label="Gallery">
              <FiCamera />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about/company">Company</Link>
          <Link to="/about/team">Team</Link>
          <Link to="/service">Services</Link>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <Link to="/">Blog</Link>
          <Link to="/">Docs</Link>
          <Link to="/">Support</Link>
          <Link to="/">Privacy Policy</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Contact</h4>
          <p>
            <FiMapPin />
            Bhubaneswar, Odisha
          </p>
          <p>
            <FiMail />
            support@mycompany.com
          </p>
          <p>
            <FiPhone />
            +91 98765 43210
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 MyCompany. All rights reserved.</span>
        <span>Built with React and Redux Toolkit</span>
      </div>
    </footer>
  );
};

export default Footer;
