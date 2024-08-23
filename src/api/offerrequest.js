export default async function FetchOffers() {
  
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    const aemurl = process.env.REACT_APP_OFFERPERSISTEDQUERY_URL + `?ts=${Math.random()*1000}`;
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;

    console.log(url);
    if(window.location && window.location.ancestorOrigins.length > 0) {
        url = aemauthorurl + aemurl
    }
    try {
        const response = await fetch(url, options)
        // TODO - Add error handling here
        const responseData = await response.json()
        console.log(responseData);

        // TODO - Add error handling here
        return responseData;

    } catch {
        return null
    }
}