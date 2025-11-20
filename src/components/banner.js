import React, { useState, useEffect } from 'react';
import FetchBanner from '../api/bannerRequest';
import './banner.css';

function Banner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        console.log('Fetching banner data');
        const result = await FetchBanner();
        console.log('Banner API result:', result);
        
        if (result) {
          // Find the asset with diet === "vegan"
          const veganAsset = Object.entries(result).find(([key, value]) => {
            // Skip non-asset properties
            if (!value['jcr:content']) return false;
            
            const metadata = value['jcr:content']?.metadata;
            return metadata?.diet === 'vegan';
          });

          if (veganAsset) {
            const [assetName, assetData] = veganAsset;
            const metadata = assetData['jcr:content'].metadata;
            
            const bannerData = {
              title: metadata['autogen:title'] || 'Product',
              description: metadata['autogen:description'] || '',
              imagePath: `/content/dam/metro/en/grocery/${assetName}`,
              tags: metadata['autogen:subject'] || []
            };
            
            console.log('Setting banner data:', bannerData);
            setBanner(bannerData);
          } else {
            console.log('No vegan asset found in result');
          }
        } else {
          console.log('No banner data found in result');
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <div className="banner-loading">
        <div className="loading-spinner">Loading banner...</div>
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-error">
            <h3>No banner data available</h3>
            <p>Unable to load banner information. Please check the console for details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-text">
          <h1 className="banner-title">{banner.title}</h1>
          {banner.description && (
            <p className="banner-description">{banner.description}</p>
          )}
          {banner.tags && banner.tags.length > 0 && (
            <div className="banner-tags">
              {banner.tags.slice(0, 5).map((tag, index) => (
                <span key={index} className="banner-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="banner-image-container">
          <img 
            src={banner.imagePath} 
            alt={banner.title} 
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;

