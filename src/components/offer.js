import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FetchOffer from '../api/offerRequest';
import './offer.css';

function getOfferItem(result) {
  return result?.data?.offerByTag?.item ?? result?.data?.offerByPath?.item ?? null;
}

function Offer({ audienceTag }) {
  const [searchParams] = useSearchParams();
  const variation = searchParams.get('variation') || 'main';
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!audienceTag) {
      setOffer(null);
      setLoading(false);
      return;
    }

    const fetchOfferData = async () => {
      try {
        setLoading(true);
        setOffer(null);
        const result = await FetchOffer(audienceTag, variation);

        const item = getOfferItem(result);
        if (item) {
          setOffer(item);
        }
      } catch (error) {
        console.error('Error fetching offer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [audienceTag, variation]);

  if (!audienceTag) {
    return null;
  }

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
            <p>Unable to load an offer for audience &ldquo;{audienceTag}&rdquo;.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="offer-container"
      data-aue-resource={"urn:aemconnection:" + offer._path + "/jcr:content/data/master"}
      data-aue-type="reference"
      data-aue-filter="cf"
    >
      <div className="offer-content">
        {offer.pretitle && (
          <div className="offer-pretitle" data-aue-prop="pretitle" data-aue-type="text">{offer.pretitle}</div>
        )}

        {offer.headline && (
          <h2 className="offer-headline" data-aue-prop="headline" data-aue-type="text">{offer.headline}</h2>
        )}

        {offer.detail && offer.detail.plaintext && (
          <div className="offer-detail" data-aue-prop="detail" data-aue-type="richtext">{offer.detail.plaintext}</div>
        )}

        {offer.heroImage && offer.heroImage._publishUrl && (
          <div className="offer-image-container">
            <img
              src={offer.heroImage._publishUrl}
              alt={offer.headline || 'Offer image'}
              className="offer-image"
              data-aue-prop="heroImage"
              data-aue-type="media"
            />
          </div>
        )}

        {offer.callToAction && (
          <div className="offer-cta">
            <button className="offer-cta-button" data-aue-prop="callToAction" data-aue-type="text">
              {offer.callToAction}
            </button>
          </div>
        )}

        {offer._variations && offer._variations.length > 0 && (
          <div className="offer-variations">
            <div className="offer-variations-label">Available for:</div>
            <div className="offer-variations-list">
              {offer._variations.map((offerVariation, index) => (
                <span key={index} className="offer-variation-tag">
                  {offerVariation.replace(/_/g, ' ')}
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
