import React from 'react';
import { collectDisclaimerHtml } from '../utils/disclaimers';
import './rbc-communication.css';

function replacePlaceholders(text, valueMap) {
  if (!text || typeof text !== 'string') return text;
  if (!valueMap || typeof valueMap !== 'object') return text;
  return text.replace(/\{([^}]+)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    return trimmedKey in valueMap ? String(valueMap[trimmedKey]) : match;
  });
}

function RbcCommunication({ communication, valueMap }) {
  if (!communication) return null;

  const top = replacePlaceholders(communication.top, valueMap);
  const placeholder = replacePlaceholders(communication.placeholder, valueMap);
  const bottom = replacePlaceholders(communication.bottom, valueMap);
  const disclaimerHtmls = collectDisclaimerHtml(communication.disclaimer);
  const hasDisclaimer = disclaimerHtmls.length > 0;

  return (
    <div className="rbc-communication">
      <div className="rbc-communication-box">
        {top && <div className="rbc-communication-top">{top}</div>}
        {placeholder && (
          <div className="rbc-communication-placeholder">
            {placeholder}
            {hasDisclaimer && <sup>†</sup>}
          </div>
        )}
        {bottom && <div className="rbc-communication-bottom">{bottom}</div>}
      </div>
      {hasDisclaimer && (
        <div className="rbc-communication-disclaimers">
          <sup className="rbc-communication-disclaimer-dagger">†</sup>
          <div className="rbc-communication-disclaimers-content">
            {disclaimerHtmls.map((html, idx) => (
              <div
                key={idx}
                className="rbc-communication-disclaimer"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RbcCommunication;
