import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Mail, Lock, AlertCircle } from 'lucide-react';
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
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'लॉग इन विफल। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>लॉग इन करें</h1>
          <p>अपने खाते में प्रवेश करें</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">ईमेल</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">पासवर्ड</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="आपका पासवर्ड"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'लॉग इन हो रहे हैं...' : 'लॉग इन करें'}
          </button>
        </form>

        <div className="auth-divider">
          <span>या</span>
        </div>

        <div className="auth-footer">
          <p>खाता नहीं है?</p>
          <Link to="/register" className="btn btn-outline btn-block">
            रजिस्टर करें
          </Link>
        </div>

        <div className="demo-credentials">
          <p><strong>डेमो के लिए:</strong></p>
          <p>ईमेल: demo@example.com</p>
          <p>पासवर्ड: demo123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
