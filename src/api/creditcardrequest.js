export default async function FetchCreditCards() {
  
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    const aemurl = process.env.REACT_APP_CCPERSISTEDQUERY_URL + `?ts=${Math.random()*1000}`;
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;

    console.log('Fetching credit cards from:', url);
    var location = window.location != window.parent.location ? 
           document.referrer :
           document.location.href;
    if(location.includes('aem/editor/canvas') > 0) {
        url = aemauthorurl + aemurl
    }
    
    try {
        const response = await fetch(url, options)
        const responseData = await response.json()
        console.log('Credit cards response:', responseData);

        return responseData;

    } catch (error) {
        console.error('Error fetching credit cards:', error);
        return null
    }
}

