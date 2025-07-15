import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../resources/genetec-tm-247x48-trim-white.png';
import bell from '../resources/bell.svg';
import avatar from '../resources/avatar.png';
import Footer from './footer';
import './Layout.css';

function Layout({ children, showAlert = true, language, onLanguageToggle }) {
  const location = useLocation();
  
  const getLanguageLabel = () => {
    return language === 'en' ? 'EN' : 'FR';
  };

  const getOppositeLanguageLabel = () => {
    return language === 'en' ? 'FR' : 'EN';
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="App">
      <header className="App-header">
        {showAlert && (
          <div className='header-alerts'>
            <p>
              Learn how to supercharge your video investigations 
              <a href="#" className="cta-button">
                Register Now
                <span className="chevron">›</span>
              </a>
            </p>
          </div>
        )}
        <div className='header-nav'>
          <div>
            <img src={logo} className="logo" alt="Genetec Logo" />
            <div>
              <ul>
                <li className={isActive('/') ? 'active' : ''}>
                  <Link to="/">Why Genetec</Link>
                </li>
                <li className={isActive('/products') ? 'active' : ''}>
                  <a href="#">Products</a>
                </li>
                <li className={isActive('/industries') ? 'active' : ''}>
                  <a href="#">Industries</a>
                </li>
                <li className={isActive('/partners') ? 'active' : ''}>
                  <a href="#">Partners</a>
                </li>
                <li className={isActive('/faq') ? 'active' : ''}>
                  <Link to="/faq">FAQ</Link>
                </li>
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