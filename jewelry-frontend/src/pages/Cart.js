import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Cart.css';

function Cart({ items = [], onUpdateQuantity, onRemove }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.03; // 3% GST on fine gold & jewellery
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal - discount + tax + (items.length > 0 ? shipping : 0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'ROYAL10' || promoCode.toUpperCase() === 'PRIVELUXE') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try ROYAL10 for 10% privilege discount.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="royal-cart-page">
        <div className="royal-container">
          <div className="empty-cart-royal">
            <div className="empty-crest">✦</div>
            <h2>Your Royal Shopping Bag is Empty</h2>
            <p>Discover our heirloom collections of 22K pure gold, certified solitaires, and uncut polki masterpieces.</p>
            <Link to="/products" className="btn btn-royal-gold btn-large" style={{ marginTop: '24px' }}>
              DISCOVER MASTERPIECES
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="royal-cart-page">
      <div className="cart-page-header">
        <div className="royal-container">
          <span className="section-subtitle">Your Selected Jewels</span>
          <h1>Royal Shopping Bag</h1>
          <p>{items.reduce((sum, i) => sum + i.quantity, 0)} Handcrafted Creations</p>
        </div>
      </div>

      <div className="royal-container cart-page-grid">
        {/* Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-table-header">
            <span>MASTERPIECE</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          <div className="cart-items-list">
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                className="royal-cart-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* Image & Title */}
                <div className="cart-item-info">
                  <div className="item-thumb-holder">
                    <img 
                      src={item.image && typeof item.image === 'string' && item.image.startsWith('/') ? item.image : '/images/kundan_choker_necklace.png'} 
                      alt={item.name} 
                      className="item-thumb" 
                    />
                  </div>
                  <div className="item-text-details">
                    <span className="item-purity-label">{item.purity || '22K Hallmarked Gold'}</span>
                    <h3>{item.name}</h3>
                    <p className="item-huid-tag">✦ BIS Hallmarked & Insured</p>
                  </div>
                </div>

                {/* Single Unit Price */}
                <div className="cart-unit-price">
                  ₹{item.price.toLocaleString('en-IN')}
                </div>

                {/* Quantity Controls */}
                <div className="cart-qty-box">
                  <button 
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="qty-val">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Total & Remove */}
                <div className="cart-total-and-del">
                  <span className="item-subtotal-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button 
                    className="cart-del-btn"
                    onClick={() => onRemove(item.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cart-security-badge">
            <ShieldCheck size={22} color="#D4AF37" />
            <div>
              <strong>Ratnalok Royal Guarantee</strong>
              <p>Every piece is 100% insured during transit and arrives in our bespoke luxury velvet presentation box.</p>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="royal-order-summary">
          <h2>Order Summary</h2>
          <div className="summary-divider-line"></div>

          <div className="summary-row">
            <span>Bag Value:</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          {promoApplied && (
            <div className="summary-row discount-row">
              <span>Privilege Discount (10%):</span>
              <span>- ₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="summary-row">
            <span>GST on Jewellery (3%):</span>
            <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          <div className="summary-row">
            <span>Insured Shipping:</span>
            <span className={shipping === 0 ? 'free-tag' : ''}>
              {shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`}
            </span>
          </div>

          <div className="summary-divider-line"></div>

          <div className="summary-total-row">
            <span>Total Payable:</span>
            <span className="total-gold-price">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          {/* Promo Code Input */}
          <div className="promo-box">
            <div className="promo-input-wrap">
              <input 
                type="text" 
                placeholder="Privilege Code (Try ROYAL10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn btn-royal-emerald btn-small" onClick={handleApplyPromo}>
                APPLY
              </button>
            </div>
            {promoApplied && <p className="promo-success">✨ 10% Royal Privé discount applied!</p>}
            {promoError && <p className="promo-error">{promoError}</p>}
          </div>

          <Link to="/checkout" className="btn btn-royal-gold btn-block" style={{ padding: '16px', marginTop: '16px' }}>
            PROCEED TO CHECKOUT <ArrowRight size={16} />
          </Link>

          <Link to="/products" className="continue-link">
            ← Continue Browsing Jewellery
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
