export default async function FetchAccountOffer(tag) {
  if (!tag) return null;

  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const endpoint =
    process.env.REACT_APP_ACCOUNTOFFER_BYTAG ||
    '/graphql/execute.json/securbank/accountOfferByTag;tag=';
  const aemurl = `${endpoint}${tag}?ts=${Math.random() * 1000}`;

  let options = { credentials: 'include' };
  let url = aempublishurl + aemurl;

  const location =
    window.location !== window.parent.location ? document.referrer : document.location.href;
  if (location.includes('aem/editor/canvas')) {
    url = aemauthorurl + aemurl;
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Account offer fetch error:', error);
    return null;
  }
}
