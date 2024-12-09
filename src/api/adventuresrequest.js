export default async function FetchAdventures(variation) {
  
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    const aemurl = process.env.REACT_APP_ADVENTURESQUERY_URL + `;variation=${variation}?ts=${Math.random()*1000}`;
    //const adventureURLs = JSON.parse(process.env.REACT_APP_ADVENTURE_URLS);
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;

    console.log(url);
    var location = window.location != window.parent.location ? 
           document.referrer :
           document.location.href;
    if(location.includes('aem/editor/canvas') > 0) {
        url = aemauthorurl + aemurl
    }
    
    try {
        const response = await fetch(url, options)
        // TODO - Add error handling here
        const responseData = await response.json();
        /* const adventures = responseData.data.adventureList.items.filter(function(adventure) {
            return adventureURLs.includes(adventure._path);
        }); */

        const adventures = responseData.data.adventureList.items.slice(0, 3);

        console.log(adventures);

        // TODO - Add error handling here
        return adventures;

    } catch {
        return null
    }
}