import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Articles from './components/articles';
import Accountbalance from './components/accountbalance';
import Transactions from './components/transactions';
import Expenses from './components/expenses';
import CreditCardDetails from './components/creditcarddetails';
import FetchContent from './api/contentrequest';
import ArticleDetail from './components/ArticleDetail';
import ArticleCarousel from './components/ArticleCarousel';
import FAQPage from './components/FAQPage';
import Layout from './components/Layout';
import Scene7Banner from './components/Scene7Banner';

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
      setContent(result.data.dashboardByPath.item);
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
        <Scene7Banner 
          imageSrc={content && content.banner && content.banner._publishUrl}
          bannerUrl={content && content.bannerUrl}
          altText="banner"
        />
        <div dangerouslySetInnerHTML={{ __html: content && content.intro && content.intro.html}}>
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
    <>
      <Helmet>
        <script type="text/javascript" src="https://s7d1.scene7.com/s7viewers/libs/responsive_image.js"></script>
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardContent language={language} onLanguageToggle={toggleLanguage} />} />
          <Route path="/article/:articlePath" element={<ArticleDetail />} />
          <Route path="/local-articles" element={<ArticleCarousel />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
