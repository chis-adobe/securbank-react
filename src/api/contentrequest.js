export default async function FetchContent(languagePath = '') {
  
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    // Construct the URL with the proper path structure: /content/dam/genetec + language path
    const basePath = `/content/dam/genetec${languagePath}/content-fragments/dashboard/account-dashboard`;
    const aemurl = process.env.REACT_APP_PERSISTEDQUERY_URL_DASHBOARD + basePath + `?ts=${Math.random()*1000}`;
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;
    
    //let frameLocation = window.location != window.parent.location ? document.referrer : document.location.href;
    //if(frameLocation.includes('aem/universal-editor/canvas') > 0) {
    if(document.referrer.includes("author")) {
        url = aemauthorurl + aemurl
    }

    try {
        const response = await fetch(url, options)
        // TODO - Add error handling here
        const responseData = await response.json()
        // TODO - Add error handling here
        return responseData;

    } catch {
        return null
    }
}