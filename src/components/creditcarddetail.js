import './creditcarddetail.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FetchCreditCardDetail from '../api/creditcarddetailrequest';

function CreditCardDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [cardDetail, setCardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const cardPath = searchParams.get('path');
    const variation = searchParams.get('variation') || 'main';

    useEffect(() => {
        if (!cardPath) {
            setLoading(false);
            return;
        }

        const fetchContent = async () => {
            setLoading(true);
            const result = await FetchCreditCardDetail(cardPath, variation);
            if (result && result.data && result.data.creditCardByPath && result.data.creditCardByPath.item) {
                setCardDetail(result.data.creditCardByPath.item);
            }
            setLoading(false);
        };

        fetchContent();
    }, [cardPath, variation]);

    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

    if (loading) {
        return <div className="creditCardDetailLoading">Loading...</div>;
    }

    if (!cardDetail) {
        return <div className="creditCardDetailError">Credit card not found</div>;
    }

    return (
        <div className='creditCardDetailSection'>
            <button className='backButton' onClick={() => navigate(-1)}>← Back to Cards</button>
            
            <div className='creditCardDetailHeader'>
                {cardDetail.creditCardImage && cardDetail.creditCardImage._dynamicUrl && (
                    <img 
                        className="creditCardDetailImage" 
                        alt={cardDetail.creditCardName} 
                        src={aempublishurl + cardDetail.creditCardImage._dynamicUrl + "&width=600"} 
                    />
                )}
                <div className='creditCardDetailHeaderText'>
                    <h1 className="creditCardDetailName">{cardDetail.creditCardName}</h1>
                    {cardDetail.shortSummary && cardDetail.shortSummary.plaintext && (
                        <p className="creditCardDetailSummary">{cardDetail.shortSummary.plaintext}</p>
                    )}
                </div>
            </div>

            {cardDetail.benefitsSummaryRich && cardDetail.benefitsSummaryRich.html && (
                <div className='creditCardBenefitsSection'>
                    <h2>Benefits</h2>
                    <div 
                        className="creditCardBenefits" 
                        dangerouslySetInnerHTML={{ __html: cardDetail.benefitsSummaryRich.html }}
                    />
                </div>
            )}

            {cardDetail.features && cardDetail.features.length > 0 && (
                <div className='creditCardFeaturesSection'>
                    <h2>Features</h2>
                    <div className='creditCardFeaturesList'>
                        {cardDetail.features.map((feature, index) => (
                            <div key={index} className='creditCardFeature'>
                                {feature.icon && feature.icon._publishUrl && (
                                    <img 
                                        src={feature.icon._publishUrl} 
                                        alt={feature.featureLabel}
                                        className='featureIcon'
                                    />
                                )}
                                <div className='featureContent'>
                                    <h3 className='featureLabel'>{feature.featureLabel}</h3>
                                    {feature.featureDescription && feature.featureDescription.html && (
                                        <div 
                                            className='featureDescription'
                                            dangerouslySetInnerHTML={{ __html: feature.featureDescription.html }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreditCardDetail;

