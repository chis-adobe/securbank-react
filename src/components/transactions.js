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
                    <td><img src={shopicon} alt="" /></td><td><strong>Calgary → Toronto</strong><br/>15/12/2024</td><td>EconoFlex</td><td>+1,240 pts</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} alt="" /></td><td><strong>Vancouver → Cancún</strong><br/>15/12/2024</td><td>Premium</td><td>+3,980 pts</td>
                </tr>
                <tr>
                    <td><img src={financeicon} alt="" /></td><td><strong>Toronto → London (LGW)</strong><br/>13/12/2024</td><td>Business</td><td>+8,750 pts</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} alt="" /></td><td><strong>Halifax → Calgary</strong><br/>12/12/2024</td><td>Econo</td><td>+920 pts</td>
                </tr>
                <tr>
                    <td><img src={shopicon} alt="" /></td><td><strong>Calgary → Las Vegas</strong><br/>12/12/2024</td><td>EconoFlex</td><td>+2,310 pts</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}