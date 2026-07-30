import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './resources/CIBCMellon_Logo_Main.svg';
import bell from './resources/bell.svg';
import './App.css';
import LoginModal from './components/loginModal';
import { authenticateUser } from './constants/authUsers';
import Articles from './components/articles';
import Accountbalance from './components/accountbalance';
import Transactions from './components/transactions';
import Expenses from './components/expenses';
import CreditCardDetails from './components/creditcarddetails';
import Footer from './components/footer';
import FetchContent from './api/contentrequest';
import FAQ from './components/faq';
import Offer from './components/offer';
import CreditCards from './components/creditcards';
import CreditCardDetail from './components/creditcarddetail';

import { Helmet } from 'react-helmet-async';

function App() {
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = (email) => {
    const authenticated = authenticateUser(email);
    if (!authenticated) {
      setLoginError('Invalid email. Use liviu@cibcmellon.com or mark@cibcmellon.com.');
      return;
    }
    setUser(authenticated);
    setLoginError(null);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setLoginError(null);
  };

  useEffect(() => {
    const fetchContent = async () => {
      const result = await FetchContent();
      setContent(result.data.dashboardByPath.item);
    };

    fetchContent();
  }, []);

  const itemId =  "urn:aemconnection:/content/dam/cibc-mellon/en/dashboard/account-dashboard/jcr:content/data/master";

  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta name="urn:adobe:aue:system:aemconnection" content={'aem:'+process.env.REACT_APP_AEM_AUTHOR}></meta>
        </Helmet>
        <header className="App-header">
          <div className='header-alerts'>
              <p><strong>Alert!</strong> Scams are growing ever more complex and sophisticated. Learn more about protecting yourself from scams</p>
          </div>
          <div className='header-nav'>
            <div>
              <img src={logo} className="logo" alt="logo" />
              <div>
                <ul>
                  <li><strong>Dashboard</strong></li>
                  <li><button type="button" className="header-nav-link">Saving Account</button></li>
                  <li><button type="button" className="header-nav-link">Transactions</button></li>
                  <li><button type="button" className="header-nav-link">Cards</button></li>
                </ul>
              </div>
              <div className="login-info">
                <img src={bell} className="bell" alt="bell" />
                {user ? (
                  <div className="login-info-user">
                    <span className="login-info-email">{user.displayName}</span>
                    <button type="button" className="login-button login-button-secondary" onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="login-button"
                    onClick={() => {
                      setLoginError(null);
                      setShowLoginModal(true);
                    }}
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
        {showLoginModal && (
          <LoginModal
            error={loginError}
            onClose={() => {
              setShowLoginModal(false);
              setLoginError(null);
            }}
            onLogin={handleLogin}
          />
        )}
        <main>
          <Routes>
            <Route path="/card-detail" element={<CreditCardDetail />} />
            <Route path="/" element={
              <div className='section' data-aue-resource={itemId} data-aue-type="reference" data-aue-filter="cf">
                <div><a href={content && content.bannerUrl}><img src={content && content.banner._publishUrl} className="banner" alt="banner" data-aue-prop="banner"  data-aue-type="media"  /></a></div>
                <div className='twocol'>
                  <Accountbalance greeting={content && content.greeting} />
                  <CreditCardDetails cardLabel={content && content.cardLabel}  />
                </div>
                <div className='twocol'>
                  <Transactions transactionTitle={content && content.transactionTitle}/>
                  <Expenses expensesTitle={content && content.expensesTitle} />
                </div>
                <div>
                  <FAQ faq={content && content.articles} />
                </div>
                <div>
                  <Offer audienceTag={user?.tag} />
                </div>
                <div>
                  <CreditCards />
                </div>
                <div>
                  <Articles articles={content && content.articles} />
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer><Footer /></footer>
      </div>
    </Router>
  );
}

export default App;
