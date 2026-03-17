import React, { useState, useEffect } from 'react';
import FetchAccountOffer from '../api/accountOfferRequest';
import logo from '../resources/SecurBank_Logo_Main.svg';
import './account-offer.css';

function AccountOffer({ accountOfferPath }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const bannerUrl = offer.banner?._dynamicUrl
    ? `${aempublishurl}${offer.banner._dynamicUrl}`
    : null;

  return (
    <div className="account-offer">
      <div className="account-offer-card">
        <div className="account-offer-content">
          <div className="account-offer-body">
            <img src={logo} alt="SecurBank" className="account-offer-logo" />
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
