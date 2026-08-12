import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, MessageCircle, Share2, ShieldCheck, Sparkles } from 'lucide-react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="royal-footer">
      {/* 1. TOP TRUST BADGES BAR */}
      <div className="footer-trust-bar">
        <div className="royal-container trust-bar-grid">
          <div className="trust-bar-item">
            <ShieldCheck size={24} className="gold-text-icon" />
            <div>
              <strong>100% BIS Hallmarked</strong>
              <span>Government of India Certified 22K/18K Gold</span>
            </div>
          </div>
          <div className="trust-bar-item">
            <Sparkles size={24} className="gold-text-icon" />
            <div>
              <strong>IGI & SGL Certified</strong>
              <span>100% Natural, Conflict-Free Diamonds</span>
            </div>
          </div>
          <div className="trust-bar-item">
            <Globe size={24} className="gold-text-icon" />
            <div>
              <strong>Insured Royal Delivery</strong>
              <span>Dispatched in Tamper-Proof Armored Transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="royal-container footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand-header">
            <div className="footer-crest">✦</div>
            <div className="footer-titles">
              <span className="brand-name">RATNALOK</span>
              <span className="brand-subtext">HAUTE JOAILLERIE • ESTD 1998</span>
            </div>
          </div>
          <p className="footer-about-text">
            For over two decades, Ratnalok has crafted bespoke royal jewellery and heirloom treasures that define royal celebrations, bridal grandeur, and enduring legacy.
          </p>
          <div className="social-links-row">
            <a href="#website" title="Global Atelier" className="social-circle-btn"><Globe size={18} /></a>
            <a href="#concierge" title="Royal Concierge" className="social-circle-btn"><MessageCircle size={18} /></a>
            <a href="#share" title="Share Jewels" className="social-circle-btn"><Share2 size={18} /></a>
          </div>
        </div>

        {/* Collections */}
        <div className="footer-col">
          <h4 className="footer-heading">Royal Collections</h4>
          <ul className="footer-links">
            <li><a href="/products?category=necklace">Bridal Polki & Chokers</a></li>
            <li><a href="/products?category=rings">Solitaire Diamond Rings</a></li>
            <li><a href="/products?category=bangles">Heritage Temple Bangles</a></li>
            <li><a href="/products?category=earrings">Emerald & Ruby Drops</a></li>
            <li><a href="/products">The Nizam Royal Suite</a></li>
          </ul>
        </div>

        {/* Royal Privé Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Privé Services</h4>
          <ul className="footer-links">
            <li><a href="#consultation">Virtual Video Consultation</a></li>
            <li><a href="#custom">Bespoke Heirloom Customization</a></li>
            <li><a href="#buyback">Lifetime Exchange & Buyback</a></li>
            <li><a href="#care">Jewellery Care & Restoration</a></li>
            <li><a href="#hallmark">Hallmark Purity Verification</a></li>
          </ul>
        </div>

        {/* Flagship Salons & Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">Privé VIP Newsletter</h4>
          <p className="newsletter-p">
            Receive private invitations to confidential high-jewellery showcases and bespoke launches.
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-royal-gold btn-small">
              JOIN
            </button>
          </form>
          {subscribed && <p className="newsletter-success">✦ Welcome to the Ratnalok Privé Circle.</p>}

          <div className="contact-quick-info">
            <div className="info-item">
              <MapPin size={16} className="gold-text-icon" />
              <span>Flagship Salon: Connaught Place, New Delhi</span>
            </div>
            <div className="info-item">
              <Phone size={16} className="gold-text-icon" />
              <span>Concierge: +91 (011) 2345-6789</span>
            </div>
            <div className="info-item">
              <Mail size={16} className="gold-text-icon" />
              <span>concierge@ratnalok.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM COPYRIGHT BAR */}
      <div className="footer-bottom-bar">
        <div className="royal-container bottom-bar-flex">
          <p>&copy; 2026 RATNALOK HAUTE JOAILLERIE PVT LTD. All Rights Reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Royal Service</a>
            <span>•</span>
            <a href="#security">Insurance & Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
