import React, { useState, useEffect } from 'react';
import FetchBanner from '../api/bannerRequest';
import './banner.css';

function Banner({ accountType = 'standard' }) {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        console.log('Fetching banner data with account type:', accountType);
        const result = await FetchBanner(accountType);
        console.log('Banner API result:', result);
        
        if (result && result.data && result.data.offerList && result.data.offerList.items) {
          const items = result.data.offerList.items;
          
          if (items.length > 0) {
            // Get the first offer item
            const firstOffer = items[0];
            
            // Add cache buster to image URL
            const imageUrl = firstOffer.heroImage?._publishUrl || firstOffer.heroImage?._authorUrl || '';
            const cacheBuster = `?ts=${Date.now()}`;
            const imagePathWithCacheBuster = imageUrl ? `${imageUrl}${cacheBuster}` : '';
            
            const bannerData = {
              headline: firstOffer.headline || 'Offer',
              pretitle: firstOffer.pretitle || '',
              description: firstOffer.detail?.plaintext || '',
              ctaLabel: firstOffer.callToAction || null,
              conditions: firstOffer.conditions || null,
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
  }, [accountType]);

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
          {banner.pretitle && (
            <div className="banner-pretitle">{banner.pretitle}</div>
          )}
          <h1 className="banner-title">{banner.headline}</h1>
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
          {banner.conditions && (
            <p className="banner-conditions">{banner.conditions}</p>
          )}
        </div>
        <div className="banner-image-container">
          <img 
            src={banner.imagePath} 
            alt={banner.headline} 
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;

