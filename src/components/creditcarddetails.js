import creditcardgreen from '../resources/creditcardgreen.png';
import creditcardgold from '../resources/creditcardgold.png';
import './creditcarddetails.css';

export default function CreditCardDetails({ cardLabel }) {


    return (
        <div>
            <div className='creditcarddetails'>
                <p className='accountNoLabel' span data-aue-prop="cardLabel" data-aue-type="text">{cardLabel}</p>
                <p className='accountNo'>WestJet Rewards</p>
            </div>
            <div className='flexrow'>
                <div className='creditcard'>
                    <img src={creditcardgreen} className="creditcardimage" alt="Credit Card" />
                </div>
                <div className='creditcardactions'>
                    <ul>
                        <li><button type="button" className="creditcard-action-link">Block card</button></li>
                        <li><button type="button" className="creditcard-action-link">Pay off the card</button></li>
                        <li><button type="button" className="creditcard-action-link">Card settings</button></li>
                    </ul>
                 </div>
                <div className='creditcardoffer'>
                    <img src={creditcardgold} className="creditcardimage" alt="Credit Card" />
                    <p><button type="button" className="creditcard-action-link creditcard-action-link--inline">Apply for a new card</button></p>
                </div>
            </div>
        </div>
    )
}