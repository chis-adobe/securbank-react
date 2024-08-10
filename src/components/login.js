import './login.css';

import bell from '../resources/bell.svg';
import avatar from '../resources/avatar.png';
import React, { useState } from 'react';

function Login({onLogin}) {

    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = () => {
      onLogin(email);
      setIsOpen(false);
    }

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    return (
      <div>
        <img src={bell} className="bell" alt="bell" />
        <img src={avatar} className="avatar" alt="avatar" />
        <button onClick={() => setIsOpen(!isOpen)} className='authFriendly'>
          {isOpen ? 'Close' : 'Login'}
        </button>
        {isOpen && (
          <div>
            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    )
}

export default Login;