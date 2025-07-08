import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArticleDetail.css';
import Layout from './Layout';
import FetchArticleByPath from '../api/articleRequest';

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { articlePath } = useParams();
  const navigate = useNavigate();
  
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Add leading slash back since React Router strips it
        const fullArticlePath = '/' + articlePath;
        // Use the dedicated articleByPath endpoint
        const result = await FetchArticleByPath(fullArticlePath);
        
        if (result && result.data && result.data.articleByPath && result.data.articleByPath.item) {
          setArticle(result.data.articleByPath.item);
        } else {
          // Handle article not found
          console.error('Article not found');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articlePath) {
      fetchArticle();
    }
  }, [articlePath]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Layout showAlert={false}>
        <div className="article-detail-loading">
          <div className="loading-spinner">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout showAlert={false}>
        <div className="article-detail-error">
          <div className="error-message">
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist.</p>
            <button onClick={handleBackClick} className="back-button">Back to Dashboard</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="article-detail-main">
        <div className="article-detail-container" 
             data-aue-resource={"urn:aemconnection:" + article._path + "/jcr:content/data/master"} 
             data-aue-type="reference" 
             data-aue-filter="cf">
          
          <div className="article-detail-header">
            <button onClick={handleBackClick} className="back-button">
              ← Back to Dashboard
            </button>
          </div>
          
          <article className="article-detail-content">
            <header className="article-detail-title-section">
              <h1 data-aue-prop="headline" data-aue-type="text" className="article-detail-title">
                {article.headline}
              </h1>
            </header>
            
            <div className="article-detail-image-section">
              <img 
                data-aue-prop="heroImage" 
                data-aue-type="media" 
                className="article-detail-image" 
                alt={article.headline}
                src={article.heroImage && article.heroImage._dynamicUrl 
                  ? aempublishurl + article.heroImage._dynamicUrl + "&width=800"
                  : "https://via.placeholder.com/800x450/cccccc/666666?text=No+Image"} 
              />
            </div>
            
            <div className="article-detail-body">
              <div 
                data-aue-prop="main" 
                data-aue-type="richtext" 
                className="article-detail-text"
                dangerouslySetInnerHTML={{ __html: article.main.html || article.main['plaintext'] }}
              />
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
}

export default ArticleDetail; 