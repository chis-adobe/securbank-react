import React, { useState } from 'react';
import './loginmodal.css';

const EMAIL_MAP = {
  'asmith@frescopa.coffee': { destination: 'North America' },
  'jdupont@frescopa.coffee': { destination: 'Europe' },
  'kparker@frescopa.coffee': { destination: 'Europe' }
};

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const emailLower = email.toLowerCase().trim();
    const userConfig = EMAIL_MAP[emailLower];

    if (!userConfig) {
      setError('Use a demo email from the list below');
      return;
    }

    onLogin({
      email: email,
      destination: userConfig.destination
    });

    setEmail('');
    setPassword('');
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="login-modal-close" onClick={handleClose}>
          ×
        </button>
        <h2 className="login-modal-title">Welcome</h2>
        <p className="login-modal-subtitle">Sign in to see your personalized travel offers</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
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
            <label htmlFor="password" className="login-label">
              Password
            </label>
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

        <div className="login-demo-info">
          <p className="login-demo-label">Demo accounts</p>
          <p>asmith@frescopa.coffee</p>
          <p>jdupont@frescopa.coffee</p>
          <p>kparker@frescopa.coffee</p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
