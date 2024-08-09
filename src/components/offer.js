import './faq.css';
import React, { useState, useEffect } from 'react';
import FetchOffer from '../api/offerrequest';

function FAQ() {

    const [faqs, setOffer] = useState(null);

    useEffect(() => {
      const fetchContent = async () => {
        const result = await FetchOffer();
        setOffer(result.data.faqList.items);
      };
  
      fetchContent();

    }, []);
  

        return (
            <div className='faq'>
                <h4 className='sectionHeading'>Special Offer</h4>
                <ul className="faqList">
                    {faqs && faqs.map((faq, index) => (
                        <li key={faq} data-aue-resource={"urn:aemconnection:" + faq._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                            <details className="faqDetails">    
                                <summary className="faqHeading">
                                    <span data-aue-prop="question" data-aue-type="text" >{faq.question}</span>
                                    <b></b>
                                </summary>
                                <div data-aue-prop="answer" data-aue-type="richtext" className="faqDescription">{faq.answer['plaintext']}</div>
                            </details>
                        </li>
                    ))}
                    </ul>
            </div>
        )
}

export default FAQ;