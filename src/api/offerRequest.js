// Fetches a single Offer content fragment by its DAM path via the
// `OfferByPath` persisted query. `REACT_APP_OFFERQUERY_URL` already ends in
// `;path=`, so we append the path and the variation to build the request.
export default async function FetchOffer(path, variation = 'main') {
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const aemurl = `${process.env.REACT_APP_OFFERQUERY_URL}${path};variation=${variation}?ts=${Math.random() * 1000}`;

  let options = { credentials: "include" };
  let url = aempublishurl + aemurl;

  var location = window.location !== window.parent.location ?
         document.referrer :
         document.location.href;
  if (location.includes('aem/editor/canvas') > 0) {
      url = aemauthorurl + aemurl;
  }

  try {
      console.log('Fetching offer from URL:', url);
      const response = await fetch(url, options);
      console.log('Offer API response status:', response.status);
      const responseData = await response.json();
      console.log('Offer API response data:', responseData);
      return responseData;
  } catch (error) {
      console.error('Offer API fetch error:', error);
      return null;
  }
}
