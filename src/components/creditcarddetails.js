import accountIcon from '../resources/finance_icon.svg';
import './creditcarddetails.css';

export default function CreditCardDetails({ cardLabel }) {


    return (
        <div>
            <div className='creditcarddetails'>
                <p className='accountNoLabel' span data-aue-prop="cardLabel" data-aue-type="text">{cardLabel}</p>
                <p className='accountNo'>Primary Account</p>
            </div>
            <div className='flexrow'>
                <div className='creditcard'>
                    <img src={accountIcon} className="creditcardimage" alt="Account" />
                </div>
                <div className='creditcardactions'>
                    <ul>
                        <li><a href="/">Transfer funds</a></li>
                        <li><a href="/">Make a payment</a></li>
                        <li><a href="/">Account settings</a></li>
                    </ul>
                 </div>
                <div className='creditcardoffer'>
                    <img src={accountIcon} className="creditcardimage" alt="Account" />
                    <p><a href="/">Open a new account</a></p>
                </div>
            </div>
        </div>
    )
}