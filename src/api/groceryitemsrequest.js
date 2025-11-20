export default async function FetchGroceryItems() {
  const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
  const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
  const aemurl = process.env.REACT_APP_GROCERYITEMS_URL + `?ts=${Math.random()*1000}`;
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
    console.log('Fetching grocery items from URL:', url);
    const response = await fetch(url, options);
    console.log('Grocery items API response status:', response.status);
    const responseData = await response.json();
    console.log('Grocery items API response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Grocery items API fetch error:', error);
    return null;
  }
}

