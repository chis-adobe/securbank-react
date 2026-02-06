import React, { useState, useEffect } from 'react';
import FetchBanner from '../api/bannerRequest';
import './banner.css';

function Banner({ dietType = 'standard' }) {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        console.log('Fetching banner data with diet type:', dietType);
        const result = await FetchBanner(dietType);
        console.log('Banner API result:', result);
        
        if (result && result.data && result.data.metroBannerList && result.data.metroBannerList.items) {
          const items = result.data.metroBannerList.items;
          
          if (items.length > 0) {
            // Get the first banner item
            const firstBanner = items[0];
            
            // Add cache buster to image URL
            const imageUrl = firstBanner.image?._publishUrl || firstBanner.image?._authorUrl || '';
            const cacheBuster = `?ts=${Date.now()}`;
            const imagePathWithCacheBuster = imageUrl ? `${imageUrl}${cacheBuster}` : '';
            
            const bannerData = {
              title: firstBanner.title || 'Banner',
              description: firstBanner.description || '',
              ctaLabel: firstBanner.ctaLabel || null,
              ctaPath: firstBanner.ctaPath || null,
              imagePath: imagePathWithCacheBuster
            };
            
            console.log('Setting banner data:', bannerData);
            setBanner(bannerData);
          } else {
            console.log('No banner items found in result');
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
  }, [dietType]);

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
          {banner.ctaLabel && (
            <div className="banner-cta">
              <button className="banner-cta-button">
                {banner.ctaLabel}
              </button>
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

