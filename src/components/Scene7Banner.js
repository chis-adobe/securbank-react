import React, { useEffect, useRef } from 'react';
import { setupScene7Image } from '../utils/scene7Utils';

const Scene7Banner = ({ imageSrc, altText = 'banner', className = 'banner', bannerUrl }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && imageSrc) {
      // Set the initial src
      imageRef.current.src = imageSrc;
      
      // Apply Scene7 responsive image logic
      setupScene7Image(imageRef.current, "https://smartimaging.scene7.com/is/image/DynamicMediaNA", altText);
    }
  }, [imageSrc, altText]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div>
      {bannerUrl ? (
        <a href={bannerUrl}>
          <img 
            ref={imageRef}
            className={className}
            alt={altText}
            data-aue-prop="banner"
            data-aue-type="media"
          />
        </a>
      ) : (
        <img 
          ref={imageRef}
          className={className}
          alt={altText}
          data-aue-prop="banner"
          data-aue-type="media"
        />
      )}
    </div>
  );
};

export default Scene7Banner; 