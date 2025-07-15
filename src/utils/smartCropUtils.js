// Smart crop utility functions

export const getSmartCropUrl = (dmS7Url, smartCrops, preferredSize = 'Large') => {
  if (!dmS7Url || !smartCrops || !Array.isArray(smartCrops)) {
    return dmS7Url;
  }

  // Find the preferred smart crop size
  const smartCrop = smartCrops.find(crop => crop.name === preferredSize);
  
  if (!smartCrop) {
    // Fallback to the first available smart crop
    const firstCrop = smartCrops[0];
    if (firstCrop) {
      return `${dmS7Url}:${firstCrop.name}`;
    }
    return dmS7Url;
  }

  // Append the smart crop name
  return `${dmS7Url}:${smartCrop.name}`;
};

// Generate srcset for responsive images
export const generateSrcSet = (dmS7Url, smartCrops) => {
  if (!dmS7Url || !smartCrops || !Array.isArray(smartCrops)) {
    return null;
  }

  // Sort smart crops by width
  const sortedCrops = [...smartCrops].sort((a, b) => a.width - b.width);
  
  // Generate srcset entries using the format: dmS7Url:name widthw
  const srcSetEntries = sortedCrops.map(crop => {
    const smartCropUrl = `${dmS7Url}:${crop.name}`;
    const encodedUrl = encodeURI(smartCropUrl);
    return `${encodedUrl} ${crop.width}w`;
  });
  
  return srcSetEntries.join(', ');
};

// Get responsive image sources for different screen sizes
export const getResponsiveImageSources = (dmS7Url, smartCrops) => {
  if (!dmS7Url || !smartCrops || !Array.isArray(smartCrops)) {
    return null;
  }

  const sources = {};
  
  // Map smart crops to common breakpoints
  smartCrops.forEach(crop => {
    if (crop.width <= 400) {
      sources.small = getSmartCropUrl(dmS7Url, smartCrops, crop.name);
    } else if (crop.width <= 700) {
      sources.medium = getSmartCropUrl(dmS7Url, smartCrops, crop.name);
    } else if (crop.width <= 1260) {
      sources.large = getSmartCropUrl(dmS7Url, smartCrops, crop.name);
    } else {
      sources.xlarge = getSmartCropUrl(dmS7Url, smartCrops, crop.name);
    }
  });

  return sources;
}; 