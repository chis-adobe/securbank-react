import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FetchOffer from '../api/offerRequest';
import './offer.css';

function Offer() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Use the logged-in user's offerId if available, otherwise fall back to URL param or default
  const urlOfferId = searchParams.get('offerId');
  const offerId = user?.offerId || urlOfferId || 'investment-offer';
  
  // Use the logged-in user's variation if available, otherwise fall back to URL param or 'main'
  const urlVariation = searchParams.get('variation');
  const variation = user?.variation || urlVariation || 'main';
  
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        setLoading(true);
        console.log('Fetching offer with ID:', offerId, 'variation:', variation, 'from query params');
        const result = await FetchOffer(offerId, variation);
        console.log('Offer API result:', result);
        
        if (result && result.data && result.data.offerByPath && result.data.offerByPath.item) {
          console.log('Setting offer data:', result.data.offerByPath.item);
          setOffer(result.data.offerByPath.item);
        } else {
          console.log('No offer data found in result');
        }
      } catch (error) {
        console.error('Error fetching offer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [offerId, variation, user]);

  if (loading) {
    return (
      <div className="offer-loading">
        <div className="loading-spinner">Loading offer...</div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="offer-container">
        <div className="offer-content">
          <div className="offer-error">
            <h3>No offer data available</h3>
            <p>Unable to load offer information. Please check the console for details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-container">
      <div className="offer-content">
        {offer.pretitle && (
          <div className="offer-pretitle">{offer.pretitle}</div>
        )}
        
        {offer.headline && (
          <h2 className="offer-headline">{offer.headline}</h2>
        )}
        
        {offer.detail && offer.detail.plaintext && (
          <div className="offer-detail">{offer.detail.plaintext}</div>
        )}
        
        {offer.heroImage && offer.heroImage._publishUrl && (
          <div className="offer-image-container">
            <img 
              src={offer.heroImage._publishUrl} 
              alt={offer.headline || 'Offer image'} 
              className="offer-image"
            />
          </div>
        )}
        
        {offer.callToAction && (
          <div className="offer-cta">
            <button className="offer-cta-button">
              {offer.callToAction}
            </button>
          </div>
        )}
        
        {offer._variations && offer._variations.length > 0 && (
          <div className="offer-variations">
            <div className="offer-variations-label">Available for:</div>
            <div className="offer-variations-list">
              {offer._variations.map((variation, index) => (
                <span key={index} className="offer-variation-tag">
                  {variation.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Offer;
