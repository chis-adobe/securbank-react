import React, { useState, useEffect, useMemo } from 'react';
import FetchAccountOffer from '../api/accountOfferRequest';
import './account-offer.css';

function getSmartCropForWidth(smartCrops, width) {
  if (!smartCrops || smartCrops.length === 0) return null;
  const sorted = [...smartCrops].sort((a, b) => a.width - b.width);
  const best = sorted.find((c) => c.width >= width);
  return (best || sorted[sorted.length - 1]).name;
}

function getBannerUrl(banner, screenWidth) {
  if (!banner) return null;
  const dmS7Url = banner._dmS7Url;
  const smartCrops = banner._smartCrops;
  if (!dmS7Url) {
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const dynamicUrl = banner._dynamicUrl;
    return dynamicUrl ? `${aempublishurl}${dynamicUrl}` : null;
  }
  const cacheBuster = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const separator = dmS7Url.includes('?') ? '&' : '?';
  if (!smartCrops || smartCrops.length === 0) {
    return `${dmS7Url}${separator}d=${cacheBuster}`;
  }
  const cropName = getSmartCropForWidth(smartCrops, screenWidth);
  return `${dmS7Url}:${cropName}${separator}d=${cacheBuster}`;
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function AccountOffer({ accountOfferPath }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = useWindowWidth();

  useEffect(() => {
    const fetchOffer = async () => {
      if (!accountOfferPath) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const result = await FetchAccountOffer(accountOfferPath);
        if (result?.data?.accountOfferByPath?.item) {
          setOffer(result.data.accountOfferByPath.item);
        } else {
          setOffer(null);
        }
      } catch (error) {
        console.error('Error fetching account offer:', error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [accountOfferPath]);

  const bannerUrl = useMemo(
    () => (offer?.banner ? getBannerUrl(offer.banner, screenWidth) : null),
    [offer?.banner, screenWidth]
  );

  if (!accountOfferPath || loading) {
    if (loading) {
      return (
        <div className="account-offer-loading">
          <div className="loading-spinner">Loading offer...</div>
        </div>
      );
    }
    return null;
  }

  if (!offer) return null;

  return (
    <div className="account-offer">
      <div className="account-offer-card">
        <div className="account-offer-content">
          <div className="account-offer-body">
            {offer.title && (
              <h3 className="account-offer-title" data-aue-prop="title" data-aue-type="text">
                {offer.title}
              </h3>
            )}
            {offer.offer && (
              <div className="account-offer-tagline" data-aue-prop="offer" data-aue-type="text">
                {offer.offer}
              </div>
            )}
            {offer.details?.html && (
              <div
                className="account-offer-details"
                data-aue-prop="details"
                data-aue-type="richtext"
                dangerouslySetInnerHTML={{ __html: offer.details.html }}
              />
            )}
            {offer.ctaLabel && (
              <div className="account-offer-cta">
                {offer.ctaUrl ? (
                  <a
                    href={offer.ctaUrl}
                    className="account-offer-cta-link"
                    data-aue-prop="ctaLabel"
                    data-aue-type="text"
                  >
                    {offer.ctaLabel}
                  </a>
                ) : (
                  <span
                    className="account-offer-cta-link"
                    data-aue-prop="ctaLabel"
                    data-aue-type="text"
                  >
                    {offer.ctaLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          {bannerUrl && (
            <div className="account-offer-image-container">
              <img
                src={bannerUrl}
                alt={offer.title || ''}
                className="account-offer-image"
                data-aue-prop="banner"
                data-aue-type="media"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountOffer;
