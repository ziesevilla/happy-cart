import React from "react";
import "../../styles/component/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>RESOURCES</h3>
            <ul>
              <li><a href="#">Find Products</a></li>
              <li><a href="#">Become a Member</a></li>
              <li><a href="#">Product Guides</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Send Feedback</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>HELP</h3>
            <ul>
              <li><a href="#">Get Help</a></li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Payment Options</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#">About Happy Cart</a></li>
              <li><a href="#">News & Updates</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Social Impact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <p className="follow-us">FOLLOW US!</p>
          <ul>
            <li>
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" />
              <a href="#">Facebook</a>
            </li>
            <li>
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
              <a href="#">Instagram</a>
            </li>
            <li>
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="Tiktok" />
              <a href="#">Tiktok</a>
            </li>
          </ul>
          <p className="country">🌐 Philippines</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HAPPY CART. ALL RIGHTS RESERVED.</p>
        <div className="footer-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
