import React, { useState } from 'react';
import './loginmodal.css';

// Email to account type mapping
const EMAIL_ACCOUNT_MAP = {
  'liviu@rbc.com': 'Checking',
  'abbas@rbc.com': 'Savings'
};

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Map email to account type
    const accountType = EMAIL_ACCOUNT_MAP[email.toLowerCase()] || 'standard';

    // Mock login - always succeeds
    onLogin({
      email: email,
      accountType: accountType
    });

    // Reset form
    setEmail('');
    setPassword('');
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowDemoAccounts(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={handleClose}>
          ×
        </button>
        <h2 className="login-modal-title">Welcome Back</h2>
        <p className="login-modal-subtitle">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-submit-button">
            Sign In
          </button>
        </form>

        <div className="login-demo-accordion">
          <button 
            type="button"
            className="login-demo-accordion-header"
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          >
            <span>Demo Accounts</span>
            <span className={`accordion-icon ${showDemoAccounts ? 'open' : ''}`}>
              ▼
            </span>
          </button>
          {showDemoAccounts && (
            <div className="login-demo-info">
              <p>liviu@rbc.com (Checking)</p>
              <p>abbas@rbc.com (Savings)</p>
              <p>Any other email (standard)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

