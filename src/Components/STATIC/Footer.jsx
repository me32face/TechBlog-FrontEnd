import React from 'react';
import "../../Assets/Styles/Footer.css";

function Footer() {
  return (
    <div className="footer-section-main">
      <footer className="footer-bg-dark text-light pt-4 pb-3">
        <div className="container">
          <div className="row">
            <hr className="footer-divider pb-3" />

            <div className="col-md-4 mb-3 footer-block">
              <h5 className="footer-title">Tech Blog</h5>
              <p className="footer-description">
                A place to explore tech updates, articles, and tips.
              </p>
            </div>

            <div className="col-md-4 mb-3 footer-block">
              <h6 className="footer-subtitle">Navigation</h6>
              <ul className="list-unstyled footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/latest" className="footer-link">Latest</a></li>
                <li><a href="/categories" className="footer-link">Categories</a></li>
                <li><a href="/about" className="footer-link">About</a></li>
              </ul>
            </div>

            <div className="col-md-4 mb-3 footer-block">
              <h6 className="footer-subtitle">Contact</h6>
              <p className="footer-contact">Email: <a href="mailto:techblog@example.com" className="footer-link">techblog@example.com</a></p>
              <p className="footer-contact">Phone: +123 456 7890</p>
            </div>
          </div>

          <hr className="footer-divider" />
          <div className="text-center footer-copy">
            &copy; 2025 Tech Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
