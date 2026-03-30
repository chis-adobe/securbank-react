import React, { useState, useEffect } from 'react';

import logo from './resources/Delta_logo.svg.png';
import bell from './resources/bell.svg';
import avatar from './resources/avatar.png';
import './App.css';
import Articles from './components/articles';
import Accountbalance from './components/accountbalance';
import Transactions from './components/transactions';
import Expenses from './components/expenses';
import CreditCardDetails from './components/creditcarddetails';
import Footer from './components/footer';
import FetchContent from './api/contentrequest';
import FAQ from './components/faq';
import Offers from './components/offers';
import LoginModal from './components/loginmodal';
import TravelOffer from './components/travel-offer';

function App() {
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await FetchContent();
      setContent(result.data.dashboardByPath.item);
    };

    fetchContent();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const itemId =  "urn:aemconnection:/content/dam/securbank/en/dashboard/account-dashboard/jcr:content/data/master";
            


  return (
    <div className="App">
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
                <li><a href="#">Saving Account</a></li>
                <li><a href="#">Transactions</a></li>
                <li><a href="#">Cards</a></li>
              </ul>
            </div>
            <div>
              <img src={bell} className="bell" alt="bell" />
              {!user ? (
                <button
                  type="button"
                  className="login-nav-button"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
              ) : (
                <>
                  <img src={avatar} className="avatar" alt="avatar" />
                  <div className="authFriendly">{user.email}</div>
                  <button type="button" className="logout-nav-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
      </div>
        
      </header>
      <main >
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
          {user?.destination && <TravelOffer destination={user.destination} />}
          <div>
            <FAQ faq={content && content.articles} />
          </div>
          <div>
            <Articles articles={content && content.articles} />
          </div>
          <div>
            <Offers />
          </div>
        </div>
      </main>

      <footer><Footer /></footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
