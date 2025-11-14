export default async function FetchCreditCardDetail(cardPath, variation = 'main') {
  
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    const baseUrl = process.env.REACT_APP_CCPATHPERSISTEDQUERY_URL;
    const aemurl = `${baseUrl};path=${cardPath};variation=${variation}?ts=${Math.random()*1000}`;
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;

    console.log('Fetching credit card detail from:', url);
    var location = window.location != window.parent.location ? 
           document.referrer :
           document.location.href;
    if(location.includes('aem/editor/canvas') > 0) {
        url = aemauthorurl + aemurl
    }
    
    try {
        const response = await fetch(url, options)
        const responseData = await response.json()
        console.log('Credit card detail response:', responseData);

        return responseData;

    } catch (error) {
        console.error('Error fetching credit card detail:', error);
        return null
    }
}

