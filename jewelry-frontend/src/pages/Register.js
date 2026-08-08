import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
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
      setError('पासवर्ड मेल नहीं खा रहे हैं');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'रजिस्ट्रेशन विफल। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>रजिस्टर करें</h1>
          <p>एक नया खाता बनाएं</p>
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
                placeholder="कम से कम 6 वर्ण"
                minLength="6"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">पासवर्ड की पुष्टि करें</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="पासवर्ड फिर से दर्ज करें"
                minLength="6"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'रजिस्टर हो रहे हैं...' : 'रजिस्टर करें'}
          </button>
        </form>

        <div className="auth-divider">
          <span>या</span>
        </div>

        <div className="auth-footer">
          <p>पहले से खाता है?</p>
          <Link to="/login" className="btn btn-outline btn-block">
            लॉग इन करें
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
