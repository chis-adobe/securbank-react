import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import FAQ from './faq';
import FetchArticlesByTag from '../api/articleByTagRequest';
import { getUserCity, getDefaultCity } from '../api/geolocationService';
import './FAQPage.css';

function FAQPage() {
  const [cityArticle, setCityArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState('');
  const navigate = useNavigate();
  
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

  useEffect(() => {
    const fetchCityArticle = async () => {
      try {
        setLoading(true);
        
        // Get user's city
        let city;
        try {
          city = await getUserCity();
          setUserCity(city);
        } catch (geoError) {
          console.warn('Geolocation failed, using default city:', geoError);
          city = getDefaultCity();
          setUserCity(city);
        }
        
        // Fetch article for the user's city
        const result = await FetchArticlesByTag(city);
        
        if (result && result.data && result.data.articleList && result.data.articleList.items && result.data.articleList.items.length > 0) {
          setCityArticle(result.data.articleList.items[0]); // Get the first article
        }
      } catch (error) {
        console.error('Error fetching city article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityArticle();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Layout showAlert={false}>
      <div className="faq-page-main">
        <div className="faq-page-container">
          <div className="faq-page-header">
            <button onClick={handleBackClick} className="back-button">
              ← Back to Dashboard
            </button>
          </div>
          
          <div className="faq-page-content">
            <FAQ />
          </div>
          
          {/* City-specific article section */}
          {loading ? (
            <div className="city-article-loading">
              <div className="loading-spinner">Loading local content...</div>
            </div>
          ) : cityArticle ? (
            <div className="city-article-section">
              <h2>Local News for {userCity}</h2>
              <div className="city-article-card">
                <img 
                  className="city-article-image" 
                  alt={cityArticle.headline}
                  src={cityArticle.heroImage && cityArticle.heroImage._dynamicUrl 
                    ? aempublishurl + cityArticle.heroImage._dynamicUrl + "&width=600"
                    : "https://via.placeholder.com/600x300/cccccc/666666?text=No+Image"} 
                />
                <div className="city-article-content">
                  <h3 className="city-article-heading">{cityArticle.headline}</h3>
                  <div 
                    className="city-article-description"
                    dangerouslySetInnerHTML={{ __html: cityArticle.main?.html || cityArticle.blurb?.html }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default FAQPage; 