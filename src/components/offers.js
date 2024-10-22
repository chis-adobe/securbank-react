import './offers.css';
import React, { useState, useEffect } from 'react';
import FetchOffers from '../api/offerrequest';

function FAQ() {

    const [offers, setOffers] = useState(null);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

    useEffect(() => {
      const fetchOffers = async () => {
        const result = await FetchOffers();
        let filteredResults = result.data.adventureList.items.filter(adventure => adventure._path.startsWith("/content/dam/delta/en"));

        setOffers(filteredResults);
      };
  
      fetchOffers();

    }, []);
  

        return (
            <div className='offers'>
                <h4 className='sectionHeading'>Adventures</h4>
                <ul className="offerList">
                    {offers && offers.map((offer, index) => (
                        <li key={offer} data-aue-resource={"urn:aemconnection:" + offer._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                            <details className="offerDetails">    
                                <summary className="offerHeading">
                                    <span data-aue-prop="question" data-aue-type="text" >{offer.title}</span>
                                    <b></b>
                                </summary>
                                <div data-aue-prop="answer" data-aue-type="richtext" className="offerDescription">{offer.description['plaintext']}</div>
                                <div class="offerExpiry"><span class="label">Trip Length:</span> {offer.tripLength}</div>
                                <img src={aempublishurl + offer.primaryImage._dynamicUrl + "&ts=" + Math.random()*1000}/>
                            </details>
                        </li>
                    ))}
                    </ul>
            </div>
        )
}

export default FAQ;