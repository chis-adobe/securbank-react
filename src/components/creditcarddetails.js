import creditcardgreen from '../resources/aircanadcard.png';
import creditcardgold from '../resources/creditcardgold.png';
import './creditcarddetails.css';

export default function CreditCardDetails({ cardLabel }) {


    return (
        <div>
            <div className='creditcarddetails'>
                <p className='accountNoLabel' span data-aue-prop="cardLabel" data-aue-type="text">{cardLabel}</p>
                <p className='accountNo'>Aeroplan Rewards</p>
            </div>
            <div className='flexrow'>
                <div className='creditcard'>
                    <img src={creditcardgreen} className="creditcardimage" alt="Credit Card" />
                </div>
                
            </div>
        </div>
    )
}