import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

function Navbar({ cartCount = 0, user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="royal-header">
      {/* Top Royal Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="royal-container announcement-content">
          <div className="announcement-item left">
            <Sparkles size={14} className="gold-text-icon" />
            <span>100% BIS 916 Hallmarked Gold & IGI Certified Solitaires</span>
          </div>
          <div className="announcement-item center">
            <span>✨ हिरकणी साज — शाही वारसा, अमर तेज | Insured Delivery Across India ✨</span>
          </div>
          <div className="announcement-item right">
            <PhoneCall size={13} className="gold-text-icon" />
            <span>Royal Concierge: 1800-HIRKANI-SAAJ</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="royal-container navbar-wrapper">
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Luxury Brand Logo */}
          <Link to="/" className="royal-brand">
            <div className="brand-crest">
              <div className="crest-emblem">✦</div>
            </div>
            <div className="brand-titles">
              <span className="brand-name">HIRKANISAAJ</span>
              <span className="brand-subtext">हिरकणी साज • HAUTE JOAILLERIE • ESTD 1998</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search Kolhapuri Saaj, Peshwai Thushi, Diamond Rings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <div className={`nav-menu-links ${isOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-item-link" onClick={() => setIsOpen(false)}>
              HOME
            </Link>
            <Link to="/products" className="nav-item-link" onClick={() => setIsOpen(false)}>
              ALL JEWELLERY
            </Link>
            <Link to="/products?category=necklace" className="nav-item-link" onClick={() => setIsOpen(false)}>
              SAAJ & CHOKERS
            </Link>
            <Link to="/products?category=rings" className="nav-item-link" onClick={() => setIsOpen(false)}>
              SOLITAIRES & RINGS
            </Link>
            <Link to="/products?category=bangles" className="nav-item-link" onClick={() => setIsOpen(false)}>
              TEMPLE BANGLES
            </Link>

            {/* Mobile Auth Options */}
            <div className="mobile-auth-section">
              {user ? (
                <>
                  <Link to="/profile" className="nav-item-link" onClick={() => setIsOpen(false)}>
                    MY PRIVÉ PROFILE
                  </Link>
                  <button className="nav-item-link logout-btn" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-item-link" onClick={() => setIsOpen(false)}>
                    LOGIN
                  </Link>
                  <Link to="/register" className="nav-item-link highlight" onClick={() => setIsOpen(false)}>
                    BECOME A PRIVÉ MEMBER
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="navbar-actions">
            {user ? (
              <Link to="/profile" className="action-btn user-profile-btn" title="My Account">
                <User size={20} />
                <span className="user-name-display">{user.name || user.email?.split('@')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="action-btn" title="Sign In">
                <User size={20} />
                <span className="auth-action-text">SIGN IN</span>
              </Link>
            )}

            {/* Shopping Bag / Cart */}
            <Link to="/cart" className="action-btn cart-action-btn" title="Shopping Bag">
              <div className="bag-icon-wrapper">
                <ShoppingBag size={22} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      className="royal-cart-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="cart-label">BAG</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
