import React from 'react';
import RbcOffer from './rbc-offer';
import RbcCommunication from './rbc-communication';
import './offers-and-communications.css';

function isCommunication(item) {
  return item && 'top' in item && 'bottom' in item;
}

function OffersAndCommunications({ items, user }) {
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const isLoggedIn = !!user;
  const valueMap = user?.valueMap || {};
  const hasUnlockedValue = !!valueMap['user.unlockedvalue'];

  return (
    <div className="offers-and-communications">
      {items.map((item, index) =>
        isCommunication(item) ? (
          isLoggedIn && hasUnlockedValue && (
            <RbcCommunication
              key={index}
              communication={item}
              valueMap={valueMap}
            />
          )
        ) : (
          <RbcOffer key={index} offer={item} />
        )
      )}
    </div>
  );
}

export default OffersAndCommunications;
