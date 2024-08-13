import maskedbackground from '../resources/maskedbackground.svg';
import './accountbalance.css';

export default function Accountbalance({greeting}) {

    return (
        <div>
            <div>
                <h2 className="greeting" data-aue-prop="greeting" data-aue-type="text">{greeting}</h2>
                <p className='accountNoLabel'>SkyMiles Account Number</p>
                <p className='accountNo'>9258372847</p>
            </div>
            <div className='accountbalance' style={{ backgroundImage: `url(${maskedbackground})` }}>
                <div className='balance'>
                    <p>SkyMiles Balance</p>
                    <h3>54,292</h3>
                </div>
                <div className='options'>
                    <p>Book a Trip</p>
                </div>
            </div>
        </div>
    )
}