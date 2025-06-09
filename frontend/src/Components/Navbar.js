import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark shadow-sm sticky-top">
      <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
        {/* Left section: Logo */}
        <div className="d-flex align-items-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/logo.png"
              alt="Imax Logo"
              style={{ height: "30px", width: "auto", cursor: "pointer" }}
            />
          </Link>
        </div>

        {/* Center: Search Bar (hidden on xs, sm) */}
        {/* <div
          className="d-none d-md-block position-relative"
          style={{ width: "350px" }}
        >
          <input
            type="text"
            placeholder="Search..."
            className="form-control ps-5"
          />
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
            <i className="bi bi-search"></i>
          </span>
        </div> */}

        {/* Right: Nav links for large screens */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link
            to="/tickets-info"
            className="text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center"
          >
            <img
              src="/ticket.png"
              alt="Tickets"
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            Tickets Info
          </Link>
          <Link
            to="/about"
            className="text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center"
          >
            <img
              src="/info.png"
              alt="About"
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            About Us
          </Link>

          <Link
            to="/advertise"
            className="text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center"
          >
            <img
              src="/movie.png"
              alt="Advertise"
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            Advertise
          </Link>
          <Link
            to="/contact"
            className="text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center"
          >
            <img
              src="/operator.png"
              alt="Contact"
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="btn d-lg-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: "transparent", border: "none" }}
        >
          <i
            className={`bi ${
              isMobileMenuOpen ? "bi-x" : "bi-list"
            } text-white fs-3`}
          ></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="bg-dark text-center py-3 d-lg-none">
          <Link
            to="/tickets-info"
            className="d-block py-2 text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center justify-content-center"
          >
            <img
              src="/ticket.png"
              alt="Tickets"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Tickets Info
          </Link>
          <Link
            to="/about"
            className="d-block py-2 text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center justify-content-center"
          >
            <img
              src="/info.png"
              alt="About"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            About Us
          </Link>

          <Link
            to="/advertise"
            className="d-block py-2 text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center justify-content-center"
          >
            <img
              src="/movie.png"
              alt="Advertise"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Advertise
          </Link>
          <Link
            to="/contact"
            className="d-block py-2 text-white text-uppercase fw-semibold text-decoration-none d-flex align-items-center justify-content-center"
          >
            <img
              src="/operator.png"
              alt="Contact"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Contact Us
          </Link>

          {/* Mobile search input (optional) */}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
