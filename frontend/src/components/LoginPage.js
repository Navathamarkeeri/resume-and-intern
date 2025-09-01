import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

// ✅ Use backend URL from .env
const API_BASE = process.env.REACT_APP_API_URL || "https://intern-backend-yfxc.onrender.com"


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed!');
        return;
      }

      // Save token for authenticated requests
      localStorage.setItem('token', data.token);

      // Navigate to dashboard with email
      navigate('/dashboard', { state: { userEmail: email } });

    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="app-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#3b82f6"/>
            <path d="M7 8h10M7 12h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="app-title">AI Internship Finder</h1>
        <p className="app-subtitle">Welcome back! Sign in to your account.</p>
      </div>

      <div className="login-card">
        <div className="auth-tabs">
          <button className="auth-tab active">Sign In</button>
          <Link to="/signup" className="auth-tab">Create Account</Link>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="forgot-password">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
