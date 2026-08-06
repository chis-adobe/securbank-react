import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import FetchOffer from '../api/offerRequest';
import './offer.css';

/* eslint-disable no-underscore-dangle */

const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

// `OfferByPath` returns a single item under data.offerByPath.item.
function getOfferItem(result) {
  return result?.data?.offerByPath?.item || null;
}

// Fallback delivery URL when no Dynamic Media smart crops are available.
function resolveImage(img) {
  if (!img) return '';
  if (img._dynamicUrl) return `${aempublishurl}${img._dynamicUrl}`;
  return img._publishUrl || '';
}

// Append a cache buster so an edited/replaced image shows immediately on reload.
// The token is generated once per load (passed in), so re-evaluating the crop on
// resize keeps the same URL and never triggers a reload/flicker.
function withCacheBust(url, token) {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}ts=${token}`;
}

// Responsive banner hero. When the CF image exposes Dynamic Media smart crops
// (_dmS7Url + _smartCrops), pick the smallest crop that still covers the banner
// width and append its name to the Scene7 URL (`s7url:CropName`), re-evaluating
// on resize. Native srcset/sizes only ever upgrades to a larger candidate and
// never reverts to a smaller crop when the screen narrows, so we drive it in JS.
// Mirrors the article hero behaviour.
function OfferHero({ heroImage, alt }) {
  const figureRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const figure = figureRef.current;
    const img = imgRef.current;
    if (!figure || !img || !heroImage) return undefined;

    // One cache buster per load, shared across resize re-evaluations.
    const bust = Date.now();

    const s7 = heroImage._dmS7Url;
    const crops = Array.isArray(heroImage._smartCrops)
      ? heroImage._smartCrops
        .filter((c) => c && c.name && c.width)
        .sort((a, b) => a.width - b.width)
      : [];

    if (s7 && crops.length) {
      const applyCrop = () => {
        const width = figure.clientWidth || window.innerWidth || 0;
        const crop = crops.find((c) => c.width >= width) || crops[crops.length - 1];
        const next = withCacheBust(`${s7}:${crop.name}`, bust);
        if (img.getAttribute('src') !== next) img.setAttribute('src', next);
      };
      applyCrop();
      window.addEventListener('resize', applyCrop);
      let ro;
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(applyCrop);
        ro.observe(figure);
      }
      return () => {
        window.removeEventListener('resize', applyCrop);
        if (ro) ro.disconnect();
      };
    }

    const src = resolveImage(heroImage);
    if (src) img.setAttribute('src', withCacheBust(src, bust));
    return undefined;
  }, [heroImage]);

  if (!heroImage) return null;
  return (
    <div className="offer-image-container" ref={figureRef}>
      <img
        ref={imgRef}
        className="offer-image"
        alt={alt || 'Offer image'}
        data-aue-prop="heroImage"
        data-aue-type="media"
      />
    </div>
  );
}

function Offer({ offerPath }) {
  const [searchParams] = useSearchParams();
  const variation = searchParams.get('variation') || 'main';
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!offerPath) {
      setOffer(null);
      setLoading(false);
      return;
    }

    const fetchOfferData = async () => {
      try {
        setLoading(true);
        setOffer(null);
        const result = await FetchOffer(offerPath, variation);

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
  }, [offerPath, variation]);

  if (!offerPath) {
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
            <p>Unable to load an offer for &ldquo;{offerPath}&rdquo;.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-container">
      <OfferHero heroImage={offer.heroImage} alt={offer.headline} />
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

        {offer.callToAction && (
          <div className="offer-cta">
            <button className="offer-cta-button" data-aue-prop="callToAction" data-aue-type="text">
              {offer.callToAction}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Offer;
