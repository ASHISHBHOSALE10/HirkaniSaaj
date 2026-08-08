import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>💎 RATNALOK</h3>
          <p>भारत का सबसे विश्वसनीय आभूषण स्टोर</p>
          <div className="social-links">
            <a href="#facebook" title="Facebook"><Facebook size={20} /></a>
            <a href="#instagram" title="Instagram"><Instagram size={20} /></a>
            <a href="#twitter" title="Twitter"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>त्वरित लिंक</h4>
          <ul>
            <li><a href="#about">हमारे बारे में</a></li>
            <li><a href="#products">आभूषण</a></li>
            <li><a href="#contact">संपर्क करें</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>नीतियां</h4>
          <ul>
            <li><a href="#privacy">गोपनीयता नीति</a></li>
            <li><a href="#terms">शर्तें और शर्तें</a></li>
            <li><a href="#shipping">शिपिंग नीति</a></li>
            <li><a href="#returns">रिटर्न नीति</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>हमसे संपर्क करें</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={18} />
              <span>दिल्ली, भारत</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+91-9876543210</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@ratnalok.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 RATNALOK. सर्वाधिकार सुरक्षित। | बड़े प्रेम के साथ भारत में बनाया गया 🇮🇳</p>
      </div>
    </footer>
  );
}

export default Footer;
