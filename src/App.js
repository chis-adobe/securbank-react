import React, { useState, useEffect } from 'react';

import logo from './resources/aircanadalogo.png'
import Login from './components/login';
import './App.css';
import Articles from './components/articles';
import Accountbalance from './components/accountbalance';
import Transactions from './components/transactions';
import Expenses from './components/expenses';
import CreditCardDetails from './components/creditcarddetails';
import Footer from './components/footer';
import FetchContent from './api/contentrequest';
import FAQ from './components/faq';
import Offer from './components/offer';

function App() {
  const [content, setContent] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const result = await FetchContent();
      setContent(result.data.dashboardByPath.item);
    };

    fetchContent();
  }, []);

  const onLogin = async (email) => {
    setSubmittedEmail(email);
    console.log(`Getting trips for ${email}`);
  }

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
            <Login onLogin={onLogin}/>
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
            <Expenses expensesTitle="Points Balance" />
          </div>
          <div>
            {submittedEmail && <Offer email={submittedEmail}/>}
          </div>
        </div>
      </main>

      <footer><Footer /></footer>
    </div>
  );
}

export default App;
