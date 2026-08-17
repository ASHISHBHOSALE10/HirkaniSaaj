import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      navigate('/login');
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
          <h1>Join HirkaniSaaj Privé</h1>
          <p>Create your exclusive royal jewellery account</p>
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
            <label htmlFor="name">Full Royal Name</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Maharani Radhika Raje"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="royal.patron@hirkanisaaj.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password (Min. 6 Characters)</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                minLength="6"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                minLength="6"
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
            {loading ? 'Creating Privé Membership...' : 'JOIN PRIVÉ MEMBERSHIP'}
          </motion.button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="auth-footer">
          <p>Already an esteemed member?</p>
          <Link to="/login" className="btn btn-royal-outline btn-block">
            SIGN IN TO ACCOUNT
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
