import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Articles from './components/articles';
import Accountbalance from './components/accountbalance';
import Transactions from './components/transactions';
import Expenses from './components/expenses';
import CreditCardDetails from './components/creditcarddetails';
import FetchContent from './api/contentrequest';
import FAQ from './components/faq';
import ArticleDetail from './components/ArticleDetail';
import Layout from './components/Layout';

import { Helmet } from 'react-helmet-async';

function DashboardContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await FetchContent();
      setContent(result.data.dashboardByPath.item);
    };

    fetchContent();
  }, []);

  const itemId =  "urn:aemconnection:/content/dam/securbank/en/dashboard/account-dashboard/jcr:content/data/master";

  return (
    <Layout>
      <Helmet>
        <meta name="urn:adobe:aue:system:aemconnection" content={'aem:'+process.env.REACT_APP_AEM_AUTHOR}></meta>
      </Helmet>
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
          <Articles articles={content && content.articles} />
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/article/:articlePath" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
