import './transactions.css';
import shopicon from '../resources/shop_icon.svg';
import financeicon from '../resources/finance_icon.svg';
import entertainmenticon from '../resources/entertainment_icon.svg';

export default function Transactions({ transactionTitle }) {
    return (
        <div className='transactions'>
            <h4 className='sectionHeading' data-aue-prop="transactionTitle" data-aue-type="text">{transactionTitle}</h4>
            <table id="transactionList">
                <tbody>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Seattle</strong><br/>15/05/2023</td><td>Card Payment</td><td>$345</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Salt Lake City</strong><br/>15/05/2023</td><td>Transfer</td><td>$555</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Atlanta</strong><br/>13/05/2023</td><td>Transfer</td><td>$220</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Detroit</strong><br/>12/05/2023</td><td>Card Payment</td><td>$209</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} /></td><td><strong>Atlanta</strong><br/>12/05/2023</td><td>Card Payment</td><td>$230</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}