import React, { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orderService, paymentService } from '../services/api';
import { CreditCard, CheckCircle, Lock, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import './Cart.css';

const calculateOrderTotals = (cartItems = []) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.03;
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

function Checkout({ cartItems = [], user }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState('');

  const { subtotal, tax, shipping, total } = useMemo(
    () => calculateOrderTotals(cartItems),
    [cartItems]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress((previousAddress) => ({ ...previousAddress, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your shopping bag is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        userId: user.id || 1,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        shippingAddress: `${address.fullName}, ${address.street}, ${address.city}, ${address.state} - ${address.zipCode} (Phone: ${address.phone})`,
      };

      const orderRes = await orderService.create(orderPayload);

      const paymentPayload = {
        orderId: orderRes.data?.id,
        amount: total,
        paymentMethod,
      };

      await paymentService.process(paymentPayload);

      setOrderSuccess(orderRes.data || { id: paymentPayload.orderId, totalAmount: total });
      localStorage.removeItem('cart');
    } catch (err) {
      setError('Unable to process order. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="royal-cart-page">
        <div className="royal-container">
          <motion.div 
            className="empty-cart-royal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ maxWidth: '640px' }}
          >
            <CheckCircle size={68} color="#D4AF37" style={{ margin: '0 auto 16px' }} />
            <span className="section-subtitle">HirkaniSaaj Order Confirmed</span>
            <h2 style={{ color: 'var(--royal-emerald-dark)', margin: '8px 0 16px' }}>
              Thank You for Your Royal Patronage
            </h2>
            <div style={{ background: '#FAF7F2', border: '1px solid #EFEAE0', borderRadius: '8px', padding: '20px', margin: '20px 0', textAlign: 'left' }}>
              <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Order Reference:</strong> #HS-{orderSuccess.id}</p>
              <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Total Amount Paid:</strong> ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
              <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Shipping:</strong> Tamper-proof Insured Armored Transit</p>
              <p style={{ margin: '6px 0', fontSize: '14px', color: '#059669', fontWeight: 600 }}>✦ 100% BIS 916 Hallmarked Purity Certificate Enclosed</p>
            </div>
            <Link to="/products" className="btn btn-royal-gold btn-large">
              CONTINUE BROWSING JEWELLERY
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="royal-cart-page">
        <div className="royal-container">
          <div className="empty-cart-royal">
            <h2>No Jewels in Bag for Checkout</h2>
            <Link to="/products" className="btn btn-royal-gold" style={{ marginTop: '20px' }}>
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
          <span className="section-subtitle">Secure Luxury Checkout</span>
          <h1>Complete Your Royal Order</h1>
          <p>End-to-end 256-bit encrypted checkout with insured armored delivery</p>
        </div>
      </div>

      <div className="royal-container cart-page-grid">
        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="checkout-form" style={{ background: '#FFFFFF', padding: '36px', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-royal-sm)' }}>
          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', color: '#B91C1C', padding: '12px 16px', borderRadius: '6px', marginBottom: '24px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F1ECE3' }}>
            <Truck size={22} color="#D4AF37" />
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif-royal)', fontSize: '18px', color: 'var(--royal-emerald-dark)' }}>
              1. Delivery Address
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Full Name *</label>
              <input required name="fullName" value={address.fullName} onChange={handleInputChange} placeholder="e.g. Shrimant Rajeshwari Rane" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Contact Phone *</label>
              <input required name="phone" value={address.phone} onChange={handleInputChange} placeholder="10-digit mobile number" />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Residence / Villa Address *</label>
            <input required name="street" value={address.street} onChange={handleInputChange} placeholder="House / Flat No., Landmark, Street Name" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>City *</label>
              <input required name="city" value={address.city} onChange={handleInputChange} placeholder="e.g. Pune, Mumbai, Kolhapur" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>State *</label>
              <input required name="state" value={address.state} onChange={handleInputChange} placeholder="State" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Postal Code *</label>
              <input required name="zipCode" value={address.zipCode} onChange={handleInputChange} placeholder="PIN Code" />
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F1ECE3' }}>
            <CreditCard size={22} color="#D4AF37" />
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif-royal)', fontSize: '18px', color: 'var(--royal-emerald-dark)' }}>
              2. Secure Payment Gateway
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
            {[
              { id: 'CARD', label: 'Credit / Debit Card (Visa, MasterCard, Amex, RuPay)', desc: 'Secure 3D-authenticated payment' },
              { id: 'UPI', label: 'UPI / NetBanking (Google Pay, PhonePe, Paytm, BHIM)', desc: 'Instant bank transfer with verification' },
              { id: 'COD', label: 'Insured Cash On Delivery (Valuables up to ₹2,00,000)', desc: 'Pay upon delivery after inspection' }
            ].map(p => (
              <label key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', border: `1.5px solid ${paymentMethod === p.id ? 'var(--royal-gold)' : '#E5DFD5'}`, borderRadius: '6px', background: paymentMethod === p.id ? '#FAF7F2' : '#FFFFFF', cursor: 'pointer' }}>
                <input type="radio" name="paymentMethod" value={p.id} checked={paymentMethod === p.id} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: 'auto', marginTop: '3px', accentColor: '#D4AF37' }} />
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--royal-emerald-dark)' }}>{p.label}</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>{p.desc}</p>
                </div>
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn-royal-gold btn-block" disabled={loading} style={{ padding: '16px', fontSize: '16px' }}>
            <Lock size={16} />
            {loading ? 'Processing Royal Order...' : `AUTHORIZE PAYMENT — ₹${total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="royal-order-summary">
          <h2>Order Summary</h2>
          <div className="summary-divider-line"></div>

          <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '16px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1ECE3', fontSize: '13.5px' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--royal-emerald-dark)' }}>{item.name}</strong>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Qty: {item.quantity}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-serif-royal)', fontWeight: 700, color: 'var(--royal-emerald)' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>GST on Gold (3%):</span>
            <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          <div className="summary-row">
            <span>Insured Express Shipping:</span>
            <span className={shipping === 0 ? 'free-tag' : ''}>
              {shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`}
            </span>
          </div>

          <div className="summary-divider-line"></div>

          <div className="summary-total-row">
            <span>Total Payable:</span>
            <span className="total-gold-price">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          <div style={{ background: '#FAF7F2', border: '1px solid #EFEAE0', padding: '12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="#D4AF37" />
            <span style={{ fontSize: '12px', color: '#4B5563' }}>256-Bit SSL Encrypted & Insured by HirkaniSaaj</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
