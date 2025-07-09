import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/SecurBank_Logo_Main.svg';
import bell from '../resources/bell.svg';
import avatar from '../resources/avatar.png';
import Footer from './footer';
import './Layout.css';

function Layout({ children, showAlert = true, language, onLanguageToggle }) {
  const getLanguageLabel = () => {
    return language === 'en' ? 'EN' : 'FR';
  };

  const getOppositeLanguageLabel = () => {
    return language === 'en' ? 'FR' : 'EN';
  };

  return (
    <div className="App">
      <header className="App-header">
        {showAlert && (
          <div className='header-alerts'>
            <p><strong>Alert!</strong> Scams are growing ever more complex and sophisticated. Learn more about protecting yourself from scams</p>
          </div>
        )}
        <div className='header-nav'>
          <div>
            <img src={logo} className="logo" alt="logo" />
            <div>
              <ul>
                <li><strong>Dashboard</strong></li>
                <li><a href="#">Saving Account</a></li>
                <li><a href="#">Transactions</a></li>
                <li><a href="#">Cards</a></li>
              </ul>
            </div>
            <div className="header-right">
              <img src={bell} className="bell" alt="bell" />
              <img src={avatar} className="avatar" alt="avatar" />
              <div className='authFriendly'>Mark Szulc</div>
              <button 
                className="language-toggle" 
                onClick={onLanguageToggle}
                aria-label={`Switch to ${getOppositeLanguageLabel()}`}
              >
                {getOppositeLanguageLabel()}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>

      <footer><Footer /></footer>
    </div>
  );
}

export default Layout; 