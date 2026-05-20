import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-col">
          <h3 className="logos">MyCompany</h3>
          <p className="text">We build modern web applications using React, Redux, and Next.js.</p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4 className="title">Quick Links</h4>
          <a href="/" className="link">
            Home
          </a>
          <a href="/about" className="link">
            About
          </a>
          <a href="/services" className="link">
            Services
          </a>
          <a href="/contact" className="link">
            Contact
          </a>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4 className="title">Resources</h4>
          <a href="/" className="link">
            Blog
          </a>
          <a href="/" className="link">
            Docs
          </a>
          <a href="/" className="link">
            Support
          </a>
          <a href="/" className="link">
            Privacy Policy
          </a>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4 className="title">Contact</h4>
          <p className="text">Bhubaneswar, Odisha</p>
          <p className="text">support@mycompany.com</p>
          <p className="text">+91 98765 43210</p>

          <div className="social">
            <span>🌐</span>
            <span>🐦</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 MyCompany. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
