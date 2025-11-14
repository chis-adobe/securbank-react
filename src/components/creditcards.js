import './creditcards.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FetchCreditCards from '../api/creditcardrequest';

function CreditCards() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [creditCards, setCreditCards] = useState(null);
    const variation = searchParams.get('variation') || 'main';

    useEffect(() => {
        const fetchContent = async () => {
            const result = await FetchCreditCards();
            if (result && result.data && result.data.creditCardList && result.data.creditCardList.items) {
                // Only take the first 4 credit cards
                const limitedCards = result.data.creditCardList.items.slice(0, 4);
                setCreditCards(limitedCards);
            }
        };

        fetchContent();
    }, []);

    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

    const handleCardClick = (cardPath) => {
        navigate(`/card-detail?path=${encodeURIComponent(cardPath)}&variation=${variation}`);
    };

    return (
        <div className='creditCardsSection'>
            <h4 className='sectionHeading'>Our Credit Cards</h4>
            <ul className="creditCardList">
                {creditCards && creditCards.map((card, index) => (
                    <li 
                        key={index} 
                        data-aue-resource={"urn:aemconnection:" + card._path + "/jcr:content/data/master"} 
                        data-aue-type="reference" 
                        data-aue-filter="cf"
                        onClick={() => handleCardClick(card._path)}
                        className="creditCardItem"
                    >
                        {card.creditCardImage && card.creditCardImage._dynamicUrl && (
                            <img 
                                data-aue-prop="creditCardImage" 
                                data-aue-type="media" 
                                className="creditCardImage" 
                                alt={card.creditCardName} 
                                src={aempublishurl + card.creditCardImage._dynamicUrl + "&width=470"} 
                            />
                        )}
                        <h5 data-aue-prop="creditCardName" data-aue-type="text" className="creditCardHeading">
                            {card.creditCardName}
                        </h5>
                        <div data-aue-prop="shortSummary" data-aue-type="richtext" className="creditCardDescription">
                            {card.shortSummary && card.shortSummary.plaintext}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreditCards;

