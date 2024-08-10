export default async function FetchOffer(email) {
  
    const USER_TRIPS = {
        "wknd-profile+90@outlook.svpoc.io": "LIS",
        "wknd-profile+39@gmail.svpoc.io": "LIS",
        "wknd-profile+193@msn.svpoc.io": "LON",
        "wknd-profile+158@outlook.svpoc.io": "LON",
        "wknd-profile+425@mailfence.svpoc.io": "LAS",
        "wknd-profile+438@mailfence.svpoc.io": "LAS",
        "wknd-profile+265@msn.svpoc.io": "LAS",
        "wknd-profile+324@comcast.svpoc.io": "LAS",
    }

    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR;
    const aemurl = process.env.REACT_APP_OFFERSQUERY_URL_DASHBOARD + USER_TRIPS[email] + `?ts=${Math.random()*1000}`;
    let options = {credentials: "include"};
    let url = aempublishurl + aemurl;

    console.log(url);
    if(window.location && window.location.ancestorOrigins.length > 0) {
        url = aemauthorurl + aemurl
    }
    try {
        //const response = await fetch(url, options)
        const response = await fetch(url);

        if (!response.ok) {
            // Handle non-2xx responses
            throw new Error('Network response was not ok');
        }

        // TODO - Add error handling here
        const responseData = await response.json()
        console.log(`Offer ${responseData}`);

        // TODO - Add error handling here
        return responseData;

    } catch (error) {
        console.error('Fetch error:', error);

        // Check for CORS error and provide a default JSON response
        if (error.message === 'Failed to fetch' || error.message === 'Network response was not ok') {
            return {
                // Your default JSON response
                message: 'CORS error occurred or network issue. Returning default data.',
                data: []
            };
        }
    }
}