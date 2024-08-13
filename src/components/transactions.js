import './transactions.css';
import shopicon from '../resources/shop_icon.svg';
import financeicon from '../resources/finance_icon.svg';
import entertainmenticon from '../resources/entertainment_icon.svg';

export default function Transactions({ transactionTitle }) {
    return (
        <div className='transactions'>
            <h4 className='sectionHeading' data-aue-prop="transactionTitle" data-aue-type="text">Latest Trips</h4>
            <table id="transactionList">
                <tbody>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Toronto</strong><br/>15/05/2023</td><td>Card Payment</td><td>$345</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Calgary</strong><br/>15/05/2023</td><td>Points</td><td>15,000</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Montreal</strong><br/>13/05/2023</td><td>Points</td><td>25,000</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Calgary</strong><br/>12/05/2023</td><td>Card Payment</td><td>$510</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Vancouver</strong><br/>12/05/2023</td><td>Card Payment</td><td>$721</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}