import Header from '../mainpage/header/Header';
import styles from './Delivery&Payments.module.css';

const Delivery = () => {
    return (
        <div>
            <Header />
            <div className={styles.text}>
                <h2>Shipping and payment</h2>
                <h4>Shipping</h4>
                <p>Orders on the RELQstore.am website are accepted through an electronic shopping card. To do this, next to the selected item, click on the buy button and the item will be added to the card. Prices and availability of all products presented on the site at the time of order are subject to clarification. You can check the prices for these products by calling or inquiring after ordering. Price quote free of charge. After placing the order, our manager will immediately contact you to receive order confirmation.</p>
                <p>Please be careful when placing an order.</p>
                <p>For delivery, you must accurately fill in the following information.</p>
                <p>Buyer's contact information: name, address and phone number.</p>
                Additional order information: any important information about the order. For example, to whom to deliver the order or the input code.
                <h2>Payment</h2>
                <h4>Payment Methods</h4>
                <p>''RELQstore''-offers two methods for payment.</p>
                <p>Online: On our website, online payment is made through Arca (Master, Visa, Arca) payment systems.</p>
                    <p>Cash: This means that you pay for the order of the goods that you order upon delivery. The courier provides your cashier's check․ Invoices can also be provided if necessary. By selecting this option on the corresponding page of the site, you also indicate whether you need to bring a trifle.</p>
                    <img src='../../../image/a.png' alt=''className={styles.img}/>
                <h4>Cash payment terms:</h4>
                <p>Cash payment is made upon receipt of the order. Our courier reserves the right to return the delivered goods if the client offers to pay for it later. Cash payments in dollars or other currencies are not accepted, as they are contrary to the legislation of the Republic of Armenia.</p>
                <p>Depending on your location, our courier may offer his services: exchange currency at the nearest exchange office and only then receive the money.</p>
                <h5>Note։ the shipping fee is paid regardless of whether you buy the item or not.</h5>
                <img src='../../../image/b.png' alt=''className={styles.img}/>
                <h4>Price, geography and Schedule:</h4>
                <p>''RELQstore'' delivery is carried out with the widest geography throughout the territory of the Republic of Armenia and the Republic of Artsakh.</p>
                <p>Delivery within the city of Yerevan costs 1000 AMD.</p>
            </div>
        </div>
    )
};

export default Delivery