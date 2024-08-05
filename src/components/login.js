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
  
    return (
      <div>
        <img src={bell} className="bell" alt="bell" />
        <img src={avatar} className="avatar" alt="avatar" />
        <button onClick={() => setIsOpen(!isOpen)} className='authFriendly'>
          {isOpen ? 'Close' : 'Login'}
        </button>
        {isOpen && (
          <div>
            <input type="email" value="{email}" onChange={(e) => setEmail(e.target.value)} />
            <button onclick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    )
}

export default Login;