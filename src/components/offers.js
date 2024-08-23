import './offers.css';
import React, { useState, useEffect } from 'react';
import FetchOffers from '../api/offerrequest';

function FAQ() {

    const [offers, setOffers] = useState(null);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

    useEffect(() => {
      const fetchOffers = async () => {
        const result = await FetchOffers();
        setOffers(result.data.flightOfferList.items);
      };
  
      fetchOffers();

    }, []);
  

        return (
            <div className='offers'>
                <h4 className='sectionHeading'>Offers</h4>
                <ul className="offerList">
                    {offers && offers.map((offer, index) => (
                        <li key={offer} data-aue-resource={"urn:aemconnection:" + offer._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                            <details className="offerDetails">    
                                <summary className="offerHeading">
                                    <span data-aue-prop="question" data-aue-type="text" >{offer.title}</span>
                                    <b></b>
                                </summary>
                                <div data-aue-prop="answer" data-aue-type="richtext" className="offerDescription">{offer.description['plaintext']}</div>
                                <img src={aempublishurl + offer.cityimage._dynamicUrl}/>
                                <div class="offerExpiry">Available Until {offer.availableuntil}</div>
                            </details>
                        </li>
                    ))}
                    </ul>
            </div>
        )
}

export default FAQ;