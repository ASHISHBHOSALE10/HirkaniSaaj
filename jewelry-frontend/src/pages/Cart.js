import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import './Cart.css';

function Cart({ items, onUpdateQuantity, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>आपकी शॉपिंग कार्ट</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>आपकी कार्ट खाली है</h2>
          <p>आभूषण खरीदने के लिए शॉपिंग शुरू करें</p>
          <Link to="/products" className="btn btn-primary">
            शॉपिंग जारी रखें
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>आपकी शॉपिंग कार्ट</h1>
        <p>{items.length} आभूषण</p>
      </div>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">{item.image}</div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="item-quantity">
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="item-total">
                <p>₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <button 
                className="remove-btn"
                onClick={() => onRemove(item.id)}
                title="हटाएं"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <aside className="cart-summary">
          <h2>ऑर्डर सारांश</h2>
          
          <div className="summary-row">
            <span>उप कुल:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>GST (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>शिपिंग:</span>
            <span className={shipping === 0 ? 'free' : ''}>
              {shipping === 0 ? 'मुफ्त' : `₹${shipping}`}
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>कुल:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-block">
            चेकआउट करें
          </Link>

          <Link to="/products" className="btn btn-outline btn-block">
            शॉपिंग जारी रखें
          </Link>

          <div className="promo-code">
            <input type="text" placeholder="प्रमोशन कोड डालें" />
            <button className="btn btn-small">लागू करें</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
