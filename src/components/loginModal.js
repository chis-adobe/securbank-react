import './loginModal.css';
import { MOCK_USERS } from '../constants/authUsers';

function LoginModal({ onClose, onLogin, error }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    onLogin(email);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div
        className="login-modal"
        role="dialog"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="login-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="login-modal-title" className="login-modal-title">Sign in</h2>
        <p className="login-modal-hint">Use one of the demo accounts below.</p>
        {error && <p className="login-modal-error" role="alert">{error}</p>}
        <form className="login-modal-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email" className="login-modal-label">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className="login-modal-input"
            placeholder="you@securbank.com"
            list="login-email-options"
            autoComplete="username"
            required
          />
          <datalist id="login-email-options">
            {Object.keys(MOCK_USERS).map((email) => (
              <option key={email} value={email} />
            ))}
          </datalist>
          <button type="submit" className="login-modal-submit">
            Log in
          </button>
        </form>
        <ul className="login-modal-users">
          {Object.entries(MOCK_USERS).map(([email, { tag }]) => (
            <li key={email}>
              <button
                type="button"
                className="login-modal-user-link"
                onClick={() => onLogin(email)}
              >
                {email} <span>({tag})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LoginModal;
