// Scene7 responsive image utility functions

export const setupScene7Image = (imageEl, dmUrl = "https://smartimaging.scene7.com/is/image/DynamicMediaNA", altText = 'dynamic media image') => {
  // Check if s7responsiveImage function is available
  if (typeof s7responsiveImage !== 'function') {
    console.error("s7responsiveImage function is not defined, ensure script include is added to head tag");
    return;
  }

  // Get image
  if (!imageEl) {
    console.error("Image element not found, ensure it is defined in the dialog");
    return;
  }

  let imageSrc = imageEl.getAttribute("src");
  if (!imageSrc) {
    console.error("Image element source not found, ensure it is defined in the dialog");
    return;
  }

  // Get imageName from imageSrc expected in the format /content/dam/<...>/<imageName>.<extension>
  let imageName = imageSrc.split("/").pop().split(".")[0];

  // Set up the Scene7 image attributes
  imageEl.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  imageEl.setAttribute("data-src", dmUrl + (dmUrl.endsWith('/') ? "" : "/") + imageName);
  imageEl.setAttribute("data-breakpoints", "360,720,940");
  imageEl.setAttribute("alt", altText);
  imageEl.setAttribute("data-mode", "smartcrop");
  imageEl.style.maxWidth = "100%";
  imageEl.style.height = "auto";

  // Apply Scene7 responsive image
  // eslint-disable-next-line no-undef
  s7responsiveImage(imageEl);
};

// Function to create and setup a Scene7 image element
export const createScene7Image = (originalSrc, altText = 'dynamic media image', className = '') => {
  const imageEl = document.createElement('img');
  imageEl.src = originalSrc;
  imageEl.alt = altText;
  if (className) {
    imageEl.className = className;
  }
  
  setupScene7Image(imageEl, "https://smartimaging.scene7.com/is/image/DynamicMediaNA", altText);
  
  return imageEl;
}; 