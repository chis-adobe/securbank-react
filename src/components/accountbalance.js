import maskedbackground from '../resources/maskedbackground.svg';
import './accountbalance.css';

export default function Accountbalance({greeting}) {

    return (
        <div>
            <div>
                <h2 className="greeting" data-aue-prop="greeting" data-aue-type="text">{greeting}</h2>
                <p className='accountNoLabel'>Aeroplan Numberr</p>
                <p className='accountNo'>755 338 274</p>
            </div>
            <div className='accountbalance' style={{ backgroundImage: `url(${maskedbackground})` }}>
                <div className='balance'>
                    <p>Aeroplan Points</p>
                    <h3>15231</h3>
                </div>
                <div className='options'>
                    <p>Book a trip on points</p>
                </div>
            </div>
        </div>
    )
}