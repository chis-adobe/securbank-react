// Fetch a single article Content Fragment by its DAM path using the same
// `articleByPath` persisted query the WestJet article block uses.
export default async function FetchArticle(path, variation = 'main') {
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const aemurl = `${process.env.REACT_APP_ARTICLEPERSISTEDQUERY_URL}${path};variation=${variation}?ts=${Math.random() * 1000}`;

  const options = { credentials: 'include' };
  let url = aempublishurl + aemurl;

  const location = window.location !== window.parent.location
    ? document.referrer
    : document.location.href;
  if (location.includes('aem/editor/canvas') > 0) {
    url = aemauthorurl + aemurl;
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData?.data?.articleByPath?.item ?? null;
  } catch {
    return null;
  }
}
