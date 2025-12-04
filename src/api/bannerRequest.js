export default async function FetchBanner(accountType = 'standard') {
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  // Drop the first letter for server-side contains check
  const accountTypeParam = accountType.substring(1);
  const aemurl = process.env.REACT_APP_OFFERBYTAG_URL + accountTypeParam + `?ts=${Math.random()*1000}`;
  let options = { credentials: "include" };
  let url = aempublishurl + aemurl;

  console.log(url);
  var location = window.location != window.parent.location ? 
         document.referrer :
         document.location.href;
  if(location.includes('aem/editor/canvas') > 0) {
      url = aemauthorurl + aemurl
  }

  try {
    console.log('Fetching banner data from URL:', url);
    const response = await fetch(url, options);
    console.log('Banner API response status:', response.status);
    const responseData = await response.json();
    console.log('Banner API response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Banner API fetch error:', error);
    return null;
  }
}

