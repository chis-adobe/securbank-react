import React from 'react';
import { collectDisclaimerItems } from '../utils/disclaimers';
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
  const disclaimerItems = collectDisclaimerItems(communication.disclaimer);
  const hasDisclaimer = disclaimerItems.length > 0;

  const aueResource = communication._path
    ? { 'data-aue-resource': `urn:aemconnection:${communication._path}/jcr:content/data/master`, 'data-aue-type': 'reference', 'data-aue-filter': 'cf' }
    : {};

  return (
    <div className="rbc-communication" {...aueResource}>
      <div className="rbc-communication-box">
        {top && <div className="rbc-communication-top" data-aue-prop="top" data-aue-type="text">{top}</div>}
        {placeholder && (
          <div className="rbc-communication-placeholder" data-aue-prop="placeholder" data-aue-type="text">
            {placeholder}
            {hasDisclaimer && <sup>†</sup>}
          </div>
        )}
        {bottom && <div className="rbc-communication-bottom" data-aue-prop="bottom" data-aue-type="text">{bottom}</div>}
      </div>
      {hasDisclaimer && (
        <div className="rbc-communication-disclaimers">
          <sup className="rbc-communication-disclaimer-dagger">†</sup>
          <div className="rbc-communication-disclaimers-content">
            {disclaimerItems.map((item, idx) => {
              const aueResource = item._path
                ? { 'data-aue-resource': `urn:aemconnection:${item._path}/jcr:content/data/master`, 'data-aue-type': 'reference', 'data-aue-filter': 'cf' }
                : {};
              return (
                <div
                  key={idx}
                  className="rbc-communication-disclaimer"
                  data-aue-prop="disclaimer"
                  data-aue-type="richtext"
                  {...aueResource}
                  dangerouslySetInnerHTML={{ __html: item.html }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RbcCommunication;
