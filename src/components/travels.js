import React, { useState, useEffect } from 'react';
import FetchOffers from '../api/offerrequest';

import './travels.css';

function Travels() {
    const [travels, setContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            const result = await FetchOffers();
            setContent(result.data.hotelOfferList.items);
        };

        fetchContent();
    }, []);

    console.log(travels);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
   
    return (
        <div class="offers">
            <h3>Featured Offers</h3>
            <ul className="travelList">
                {travels && travels.map((travel, index) => (
                    <li key={index} data-aue-resource={"urn:aemconnection:" + travel._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                        <img data-aue-prop="heroImage" data-aue-type="media" className="travelImage" alt="decorative" src={aempublishurl + travel.thumbnail._dynamicUrl + "&width=470"} />
                        <h5 data-aue-prop="headline" data-aue-type="text" className="travelHeading">Travel: {travel.title}</h5>
                        <div data-aue-prop="main" data-aue-type="richtext" className="travelDescription">{travel.teaser['plaintext']}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Travels;