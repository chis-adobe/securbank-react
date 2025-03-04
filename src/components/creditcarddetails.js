import creditcardgreen from '../resources/cc-avionrewards_ion.png';
import creditcardgold from '../resources/cc_cashbackpreferred_en.png';
import './creditcarddetails.css';

export default function CreditCardDetails({ cardLabel }) {


    return (
        <div>
            <div className='creditcarddetails'>
                <p className='accountNoLabel' span data-aue-prop="cardLabel" data-aue-type="text">{cardLabel}</p>
                <p className='accountNo'>Avion Rewards</p>
            </div>
            <div className='flexrow'>
                <div className='creditcard'>
                    <img src={creditcardgreen} className="creditcardimage" alt="Credit Card" />
                </div>
                <div className='creditcardactions'>
                    <ul>
                        <li><a href="#">Block card</a></li>
                        <li><a href="#">Pay off the card</a></li>
                        <li><a href="#">Card settings</a></li>
                    </ul>
                 </div>
                <div className='creditcardoffer'>
                    <img src={creditcardgold} className="creditcardimage" alt="Credit Card" />
                    <p><a href="#">Apply for a new card</a></p>
                </div>
            </div>
        </div>
    )
}