import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Footer.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Function to handle link clicks
  const handleLinkClick = (e) => {
    e.preventDefault();
    scrollToTop();
    // Optional: Add a small delay to ensure scroll completes before potential page navigation
    setTimeout(() => {
      // If you want actual navigation, you could use:
      // window.location.href = e.target.href;
      // Or with React Router:
      // navigate('/');
    }, 300);
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <h3>STAY IN THE LOOP</h3>
          <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
            />
            <button className="newsletter-btn" onClick={scrollToTop}>SUBSCRIBE</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-columns">
          {/* Shop Section */}
          <div className="footer-column">
            <h3>SHOP</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>New Arrivals</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Best Sellers</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Women</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Men</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Accessories</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Sale & Clearance</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>Contact Us</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Shipping Information</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Returns & Exchanges</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Size Guide</Link></li>
              <li><Link to="/" onClick={scrollToTop}>FAQ</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Order Tracking</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Help Center</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>About Happy Cart</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Careers</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Press & Media</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Sustainability</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Blog & Updates</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Affiliate Program</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Store Locator</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="footer-column">
            <h3>MY ACCOUNT</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>My Profile</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Order History</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Wishlist</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Rewards</Link></li>
              <li><Link to="/" onClick={scrollToTop}>Notifications</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-column">
            <h3>CONTACT & SOCIAL</h3>
            <div className="contact-info">
              <p>📞 +63 912 345 6789</p>
              <p>✉️ support@happycart.com</p>
              <p>📍 123 Fashion Street, Manila, Philippines</p>
            </div>
            
            <div className="social-section">
              <p className="follow-us">FOLLOW US</p>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <FaTiktok />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="country-selector">
              <span>🌐 Philippines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Security */}
      <div className="footer-payment">
        <div className="payment-methods">
          <span>We Accept:</span>
          <div className="payment-icons">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 American Express</span>
            <span>📱 GCash</span>
            <span>📱 PayPal</span>
          </div>
        </div>
        <div className="security-badges">
          <span>🔒 Secure Payment</span>
          <span>🛡️ SSL Encrypted</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>© 2025 HAPPY CART. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="legal-links">
            <Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link>
            <Link to="/terms" onClick={scrollToTop}>Terms of Service</Link>
            <Link to="/refunds" onClick={scrollToTop}>Refund Policy</Link>
            <Link to="/shipping" onClick={scrollToTop}>Shipping Policy</Link>
            <Link to="/cookies" onClick={scrollToTop}>Cookie Policy</Link>
            <Link to="/accessibility" onClick={scrollToTop}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;