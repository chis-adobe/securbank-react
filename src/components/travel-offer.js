import React, { useState, useEffect, useMemo } from 'react';
import FetchTravelOffers from '../api/travelOfferRequest';
import './travel-offer.css';

function getSmartCropForWidth(smartCrops, width) {
  if (!smartCrops || smartCrops.length === 0) return null;
  const sorted = [...smartCrops].sort((a, b) => a.width - b.width);
  const best = sorted.find((c) => c.width >= width);
  return (best || sorted[sorted.length - 1]).name;
}

function getImageUrl(image, screenWidth) {
  if (!image) return null;
  const dmS7Url = image._dmS7Url;
  if (!dmS7Url) {
    const pub = process.env.REACT_APP_AEM_PUBLISH;
    return image._publishUrl || (image._dynamicUrl ? `${pub}${image._dynamicUrl}` : null);
  }
  const smartCrops = image._smartCrops;
  const cacheBuster = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const sep = dmS7Url.includes('?') ? '&' : '?';
  if (!smartCrops || smartCrops.length === 0) {
    return `${dmS7Url}${sep}d=${cacheBuster}`;
  }
  const cropName = getSmartCropForWidth(smartCrops, screenWidth);
  return `${dmS7Url}:${cropName}${sep}d=${cacheBuster}`;
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

function formatBookByDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

function TravelOfferCard({ offer, screenWidth }) {
  const imageUrl = useMemo(
    () => getImageUrl(offer.image, screenWidth),
    [offer.image, screenWidth]
  );

  const termsRef = offer.disclaimer?.termsReference || '';
  const termsHtml = offer.disclaimer?.termDetails?.html || '';

  return (
    <article className="travel-offer-card">
      {imageUrl && (
        <div className="travel-offer-image-wrap">
          <img
            src={imageUrl}
            alt={offer.title || ''}
            className="travel-offer-image"
          />
        </div>
      )}
      <div className="travel-offer-body">
        {offer.title && <h3 className="travel-offer-title">{offer.title}</h3>}
        {offer.description?.html && (
          <div
            className="travel-offer-description"
            dangerouslySetInnerHTML={{ __html: offer.description.html }}
          />
        )}
        {offer.bookBefore != null && offer.discount != null && (
          <p className="travel-offer-promo">
            Book by {formatBookByDate(offer.bookBefore)} and receive a {offer.discount}% Discount
          </p>
        )}
        {offer.ctaLabel && (
          <div className="travel-offer-cta-wrap">
            {offer.ctaLink ? (
              <a href={offer.ctaLink} className="travel-offer-cta">
                {offer.ctaLabel}
              </a>
            ) : (
              <span className="travel-offer-cta">{offer.ctaLabel}</span>
            )}
          </div>
        )}
        {(termsRef || termsHtml) && (
          <div className="travel-offer-disclaimer">
            {termsRef && <span className="travel-offer-terms-ref">{termsRef}</span>}
            {termsRef && termsHtml && <span className="travel-offer-disclaimer-sep"> | </span>}
            {termsHtml && (
              <span
                className="travel-offer-terms-html"
                dangerouslySetInnerHTML={{ __html: termsHtml }}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function TravelOffer({ destination }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = useWindowWidth();

  useEffect(() => {
    const load = async () => {
      if (!destination) {
        setItems(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      const result = await FetchTravelOffers(destination);
      const list = result?.data?.travelOfferList?.items;
      setItems(Array.isArray(list) ? list : []);
      setLoading(false);
    };
    load();
  }, [destination]);

  if (!destination) return null;

  if (loading) {
    return (
      <div className="travel-offer-section">
        <p className="travel-offer-loading">Loading travel offers…</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="travel-offer-section">
        <p className="travel-offer-empty">No travel offers available for your region.</p>
      </div>
    );
  }

  return (
    <section className="travel-offer-section">
      <h2 className="travel-offer-section-heading">Travel offers</h2>
      <div className="travel-offer-list">
        {items.map((offer, index) => (
          <TravelOfferCard key={index} offer={offer} screenWidth={screenWidth} />
        ))}
      </div>
    </section>
  );
}

export default TravelOffer;
