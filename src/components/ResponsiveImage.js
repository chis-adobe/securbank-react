import React from 'react';
import { generateSrcSet } from '../utils/smartCropUtils';

const ResponsiveImage = ({ 
  dmS7Url, 
  smartCrops, 
  alt, 
  className, 
  fallbackSrc,
  ...props 
}) => {
  // Generate srcset for responsive images
  const srcSet = generateSrcSet(dmS7Url, smartCrops);
  
  // Use the base dmS7Url as the fallback src, or the provided fallbackSrc
  const defaultSrc = dmS7Url ? encodeURI(dmS7Url) : (fallbackSrc || '');

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes="(max-width: 480px) 280px, (max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default ResponsiveImage; 