export default async function FetchOffer(email) {
  
    const USER_TRIPS = {
        "wknd-profile+90@outlook.svpoc.io": "LIS",
        "wknd-profile+97@outlook.svpoc.io": "LIS",
        "wknd-profile+39@gmail.svpoc.io": "LIS",
        "wknd-profile+85@gmail.svpoc.io": "LIS",
        "wknd-profile+63@gmail.svpoc.io": "LIS",
        "wknd-profile+20@gmail.svpoc.io": "LIS",
        "wknd-profile+89@gmail.svpoc.io": "LIS",
        "wknd-profile+35@gmail.svpoc.io": "LIS",
        "wknd-profile+21@gmail.svpoc.io": "LIS",
        "wknd-profile+72@gmail.svpoc.io": "LIS",
        "wknd-profile+193@msn.svpoc.io": "LHR",
        "wknd-profile+158@outlook.svpoc.io": "LHR",
        "wknd-profile+179@outlook.svpoc.io": "LHR",
        "wknd-profile+209@msn.svpoc.io": "LHR",
        "wknd-profile+189@msn.svpoc.io": "LHR",
        "wknd-profile+212@msn.svpoc.io": "LHR",
        "wknd-profile+210@msn.svpoc.io": "LHR",
        "wknd-profile+179@outlook.svpoc.io": "LHR",
        "wknd-profile+425@mailfence.svpoc.io": "LAS",
        "wknd-profile+438@mailfence.svpoc.io": "LAS",
        "wknd-profile+385@mailfence.svpoc.io": "LAS",
        "wknd-profile+265@msn.svpoc.io": "LAS",
        "wknd-profile+244@msn.svpoc.io": "LAS",
        "wknd-profile+324@comcast.svpoc.io": "LAS",
        "wknd-profile+315@comcast.svpoc.io": "LAS",
        "wknd-profile+291@comcast.svpoc.io": "LAS",
        "wknd-profile+248@msn.svpoc.io": "LAS",
        "wknd-profile+290@comcast.svpoc.io": "LAS",
        "wknd-profile+383@mailfence.svpoc.io": "LAS",
        "wknd-profile+435@mailfence.svpoc.io": "LAS",
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