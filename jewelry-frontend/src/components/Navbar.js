import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar({ cartCount, user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Indian Flag Colors Bar */}
      <div className="flag-bar">
        <div className="flag-saffron"></div>
        <div className="flag-white"></div>
        <div className="flag-green"></div>
      </div>

      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">💎</span>
          <span className="logo-text">RATNALOK</span>
          <span className="logo-tagline">आपका रत्न भंडार</span>
        </Link>

        {/* Desktop Menu */}
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            होम
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>
            आभूषण
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>
                प्रोफाइल
              </Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                लॉग आउट
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                लॉग इन
              </Link>
              <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>
                रजिस्टर
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="nav-right">
          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user && (
            <div className="user-greeting">
              <User size={20} />
              <span>{user.email?.split('@')[0]}</span>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
