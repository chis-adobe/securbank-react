import React, { useState, useEffect } from 'react';
import FetchOffer from '../api/offerrequest';

const Offer = ({ email }) => {

    const [offers, setOffer] = useState(null);

    useEffect(() => {
      const fetchOffer = async (email) => {
        const result = await FetchOffer(email);
        setOffer(result.data.hotelOfferList.items);
      };
  
      fetchOffer(email);

    }, []);
  

        return (
            <div className='faq'>
                <h4 className='sectionHeading'>Special Offer</h4>
                <ul className="faqList">
                    {offers && offers.map((offer, index) => (
                        <li key={offer} data-aue-resource={"urn:aemconnection:" + offer._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                            <details className="faqDetails">    
                                <summary className="faqHeading">
                                    <span data-aue-prop="question" data-aue-type="text" >{offer.title}</span>
                                    <b></b>
                                </summary>
                                <div data-aue-prop="answer" data-aue-type="richtext" className="faqDescription">{offer.teaser['html']}</div>
                            </details>
                        </li>
                    ))}
                    </ul>
            </div>
        )
}

export default Offer;