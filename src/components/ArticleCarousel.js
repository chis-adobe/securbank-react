import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ArticleCarousel.css';
import Layout from './Layout';
import FetchArticlesByTag from '../api/articleByTagRequest';
import { getUserCity, getDefaultCity } from '../api/geolocationService';

function ArticleCarousel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCity, setUserCity] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
        
        // Fetch articles by tag (city)
        const result = await FetchArticlesByTag(city);
        
        if (result && result.data && result.data.articleList && result.data.articleList.items) {
          setArticles(result.data.articleList.items);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, articles.length - 3);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, articles.length - 3);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Layout showAlert={false}>
        <div className="carousel-loading">
          <div className="loading-spinner">Loading articles for your area...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showAlert={false}>
        <div className="carousel-error">
          <div className="error-message">
            <h2>Unable to Load Articles</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (articles.length === 0) {
    return (
      <Layout showAlert={false}>
        <div className="carousel-empty">
          <div className="empty-message">
            <h2>No Articles Found</h2>
            <p>No articles are currently available for {userCity}.</p>
            <Link to="/" className="back-link">Back to Dashboard</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const showCarousel = articles.length > 3;

  return (
    <Layout showAlert={false}>
      <div className="carousel-container">
        <div className="carousel-header">
          <div className="carousel-header-top">
            <button onClick={handleBackClick} className="carousel-back-button">
              ← Back to Dashboard
            </button>
          </div>
          <h1>Local Articles for {userCity}</h1>
          <p>Discover what's happening in your area</p>
        </div>
        
        <div className="carousel-wrapper">
          {showCarousel && (
            <button 
              className="carousel-button prev" 
              onClick={prevSlide}
              aria-label="Previous articles"
            >
              ‹
            </button>
          )}
          
          <div className={`carousel-content ${showCarousel ? 'carousel-scrollable' : ''}`}>
            <div 
              className="carousel-articles-grid"
              style={showCarousel ? { transform: `translateX(-${currentIndex * (100 / 3)}%)` } : {}}
            >
              {articles.map((article, index) => (
                <div key={index} className="carousel-article-card">
                  <Link to={`/article/${encodeURIComponent(article._path)}`} className="carousel-article-link">
                    <img 
                      className="carousel-article-image" 
                      alt={article.headline}
                      src={article.heroImage && article.heroImage._dynamicUrl 
                        ? aempublishurl + article.heroImage._dynamicUrl + "&width=470"
                        : "https://via.placeholder.com/470x264/cccccc/666666?text=No+Image"} 
                    />
                    <h5 className="carousel-article-heading">{article.headline}</h5>
                    <div 
                      className="carousel-article-description"
                      dangerouslySetInnerHTML={{ __html: article.blurb?.html || article.blurb?.['plaintext'] || '' }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {showCarousel && (
            <button 
              className="carousel-button next" 
              onClick={nextSlide}
              aria-label="Next articles"
            >
              ›
            </button>
          )}
        </div>
        
        {showCarousel && (
          <div className="carousel-indicators">
            {Array.from({ length: Math.ceil(articles.length / 3) }, (_, index) => (
              <button
                key={index}
                className={`indicator ${Math.floor(currentIndex / 3) === index ? 'active' : ''}`}
                onClick={() => goToSlide(index * 3)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ArticleCarousel; 