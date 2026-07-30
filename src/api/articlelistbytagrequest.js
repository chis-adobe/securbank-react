// Fetch the tag-personalized article list (articleListByTag). Returns the
// array of article items, or an empty array on failure.
export default async function FetchArticleListByTag(tag, variation = 'main') {
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const aemurl = `${process.env.REACT_APP_ARTICLETAGQUERY_URL}${tag};variation=${variation}?ts=${Math.random() * 1000}`;

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
    return responseData?.data?.articleList?.items ?? [];
  } catch {
    return [];
  }
}
