import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './Auth.css';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      // Fallback demo simulation
      const fallbackUser = {
        id: 1,
        email: formData.email,
        name: formData.email.split('@')[0].toUpperCase(),
        token: 'demo-jwt-royal-token-2026'
      };
      setUser(fallbackUser);
      localStorage.setItem('user', JSON.stringify(fallbackUser));
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-crest-emblem">✦</div>
        
        <div className="auth-header">
          <h1>Royal Sign In</h1>
          <p>Access your Privé Vault, bespoke orders & wishlist</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <motion.div 
              className="error-message"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">Registered Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="royal.patron@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn btn-royal-gold btn-block" 
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '14px', marginTop: '6px' }}
          >
            <Sparkles size={16} />
            {loading ? 'Authenticating...' : 'SIGN IN TO PRIVÉ'}
          </motion.button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="auth-footer">
          <p>New to Ratnalok Haute Joaillerie?</p>
          <Link to="/register" className="btn btn-royal-outline btn-block">
            CREATE PRIVÉ ACCOUNT
          </Link>
        </div>

        <div className="demo-credentials">
          <p><strong>Demo Instant Access:</strong></p>
          <p>Email: <code>maharani@ratnalok.com</code> | Password: <code>royal123</code></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
