import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../services/api';
import { Package, Mail, MapPin, LogOut, Award, Sparkles, Phone } from 'lucide-react';
import './Cart.css';

function Profile({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await orderService.getUserOrders(user.id || 1);
        setOrders(res.data && res.data.length > 0 ? res.data : mockPastOrders);
      } catch (err) {
        setOrders(mockPastOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const mockPastOrders = [
    {
      id: 849201,
      createdAt: '2026-08-10',
      status: 'DISPATCHED - INSURED TRANSIT',
      totalAmount: 185000,
      item: 'The Nizam Royal Polki Choker (22K Gold)'
    }
  ];

  if (!user) return null;

  return (
    <div className="royal-cart-page">
      <div className="cart-page-header">
        <div className="royal-container">
          <span className="section-subtitle">Ratnalok Privé Member Portal</span>
          <h1>My Royal Account</h1>
          <p>Heirloom orders, bespoke requests, and private concierge privileges</p>
        </div>
      </div>

      <div className="royal-container cart-page-grid">
        {/* User Card */}
        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-royal-sm)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0B251C 0%, #153E30 100%)', border: '2px solid var(--royal-gold)', color: 'var(--royal-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', fontFamily: 'var(--font-serif-royal)' }}>
              {user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '✦')}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--royal-emerald-dark)', fontFamily: 'var(--font-serif-royal)' }}>
                  {user.name || 'Royal Patron'}
                </h3>
                <Sparkles size={14} color="#D4AF37" />
              </div>
              <span style={{ fontSize: '11px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--royal-gold-dark)', padding: '2px 8px', borderRadius: '20px', fontWeight: 700, letterSpacing: '0.08em', marginTop: '4px', display: 'inline-block' }}>
                PRIVÉ GOLD TIER
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #F1ECE3', paddingTop: '20px', fontSize: '13.5px', color: '#4B5563' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} color="#D4AF37" /> <span>{user.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={16} color="#D4AF37" /> <span>+91-98765-XXXXX (Verified)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="#D4AF37" /> <span>India • Priority Royal Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={16} color="#D4AF37" /> <span>Dedicated Concierge Access</span>
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="btn btn-royal-outline btn-block" 
            style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <LogOut size={16} /> LOGOUT
          </button>
        </div>

        {/* Orders & Vault */}
        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-royal-sm)' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', color: 'var(--royal-emerald-dark)', fontFamily: 'var(--font-serif-royal)' }}>
            <Package size={22} color="#D4AF37" /> Heirloom Orders & Vault History
          </h3>

          {loading ? (
            <p>Retrieving order history...</p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777' }}>
              <p>You have not placed any jewellery orders yet.</p>
              <Link to="/products" className="btn btn-royal-gold" style={{ marginTop: '16px' }}>
                EXPLORE MASTERPIECES
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #EFEAE0', borderRadius: '8px', padding: '20px', background: '#FCFBF8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <strong style={{ fontFamily: 'var(--font-serif-royal)', color: 'var(--royal-emerald-dark)' }}>
                        Order #RL-{order.id}
                      </strong>
                      <span style={{ display: 'block', fontSize: '12px', color: '#9CA3AF' }}>Date: {order.createdAt || 'Recent'}</span>
                    </div>
                    <span style={{ color: '#059669', fontWeight: 700, fontSize: '12px', background: '#D1FAE5', padding: '4px 10px', borderRadius: '20px', height: 'fit-content' }}>
                      {order.status || 'ORDER CONFIRMED'}
                    </span>
                  </div>
                  {order.item && (
                    <p style={{ margin: '8px 0', fontSize: '13.5px', color: '#374151' }}>
                      <strong>Creation:</strong> {order.item}
                    </p>
                  )}
                  <p style={{ margin: '4px 0', fontSize: '15px', color: 'var(--royal-emerald)', fontWeight: 800, fontFamily: 'var(--font-serif-royal)' }}>
                    Total: ₹{order.totalAmount?.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
