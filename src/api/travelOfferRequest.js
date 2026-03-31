export default async function FetchTravelOffers(destinationTag, demographic) {
  if (!destinationTag) return null;

  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const endpoint =
    process.env.REACT_APP_TRAVEL_OFFER_QUERY_URL ||
    '/graphql/execute.json/securbank/travelOfferListByTag;tag=';
  let pathAfterTag = `${endpoint}${encodeURIComponent(destinationTag)}`;
  if (demographic) {
    pathAfterTag += `;variation=${encodeURIComponent(`genai_${demographic}`)}`;
  }
  const aemurl = `${pathAfterTag}?ts=${Math.random() * 1000}`;

  let options = { credentials: 'include' };
  let url = aempublishurl + aemurl;

  if (window.location && window.location.ancestorOrigins.length > 0) {
    url = aemauthorurl + aemurl;
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Travel offer fetch error:', error);
    return null;
  }
}
