import React from 'react';
import { collectDisclaimerHtml } from '../utils/disclaimers';
import logo from '../resources/rbc-logo.png';
import './rbc-offer.css';

function RbcOffer({ offer }) {
  if (!offer) return null;

  const descriptionHtml = offer.description?.html;
  const imageUrl = offer.image?._publishUrl;
  const ctaText = offer.ctaText;
  const ctaUrl = offer.ctaUrl;
  const disclaimerHtmls = collectDisclaimerHtml(offer.disclaimer);

  const aueResource = offer._path
    ? { 'data-aue-resource': `urn:aemconnection:${offer._path}/jcr:content/data/master`, 'data-aue-type': 'reference', 'data-aue-filter': 'cf' }
    : {};

  return (
    <div className="rbc-offer" {...aueResource}>
      <div className="rbc-offer-card">
        <div className="rbc-offer-content">
          <div className="rbc-offer-body">
            <img src={logo} alt="RBC" className="rbc-offer-logo" />
            {descriptionHtml && (
              <div
                className="rbc-offer-description"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            )}
            {ctaText && (
              <div className="rbc-offer-cta">
                {ctaUrl ? (
                  <a href={ctaUrl} className="rbc-offer-cta-link">
                    {ctaText}
                  </a>
                ) : (
                  <span className="rbc-offer-cta-link">{ctaText}</span>
                )}
              </div>
            )}
          </div>
          {imageUrl && (
            <div className="rbc-offer-image-container">
              <img src={imageUrl} alt="" className="rbc-offer-image" />
            </div>
          )}
        </div>
      </div>
      {disclaimerHtmls.length > 0 && (
        <div className="rbc-offer-disclaimers">
          {disclaimerHtmls.map((html, idx) => (
            <div
              key={idx}
              className="rbc-offer-disclaimer"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RbcOffer;
