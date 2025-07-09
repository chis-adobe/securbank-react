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
import ArticleCarousel from './components/ArticleCarousel';
import Layout from './components/Layout';

import { Helmet } from 'react-helmet-async';

function DashboardContent({ language, onLanguageToggle }) {
  const [content, setContent] = useState(null);

  const getLanguagePath = () => {
    return language === 'en' ? '/en' : '/fr';
  };

  useEffect(() => {
    const fetchContent = async () => {
      const languagePath = getLanguagePath();
      const result = await FetchContent(languagePath);
      setContent(result.data.dashboardList.items[0]);
    };

    fetchContent();
  }, [language]);

  const languagePath = getLanguagePath();
  const itemId = `urn:aemconnection:/content/dam/genetec${languagePath}/dashboard/account-dashboard/jcr:content/data/master`;

  return (
    <Layout language={language} onLanguageToggle={onLanguageToggle}>
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
  const [language, setLanguage] = useState('en'); // Default to English

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardContent language={language} onLanguageToggle={toggleLanguage} />} />
        <Route path="/article/:articlePath" element={<ArticleDetail />} />
        <Route path="/local-articles" element={<ArticleCarousel />} />
      </Routes>
    </Router>
  );
}

export default App;
