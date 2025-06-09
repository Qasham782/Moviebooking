import React from "react";
import "./Footer.css"; // Don't forget to import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src="/logo.png" alt="IMAX Logo" />
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <a href="/advertise">Advertise</a>
          <a href="/tickets-info">Tickets Info</a>
          <a href="/contact">Contact Us</a>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h4>STAY IN TOUCH</h4>
          <div className="footer-icons">
            <a href="https://facebook.com/qashamahmed" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://github.com/Qasham782" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://instagram.com/qashamahmed" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © Copyright 2025 IMAX & Entertainment Square Co.
          All Rights Reserved. Powered by <span className="red-dot">◉</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
