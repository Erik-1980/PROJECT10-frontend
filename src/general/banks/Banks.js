import Header from '../mainpage/header/Header';
import styles from './Banks.module.css';

const Banks = () => {
    return (
        <div>
            <Header />
            <div className={styles.text}>
                <h2>Credit terms</h2>
                <ul>
                    <li>It’s issued within 5-15 minutes locally</li>
                    <li>The customer must provide his passport , social card or Identification Card(ID card)</li>
                    <li>Issued to those who are at age 18-70</li>
                    <li>Issued to all the citizens of the Republic of Armenia and Artsakh residents</li>
                    <li>The customer must have positive credit history or should be a registered employee</li>
                    <li>Credit is issued on each day of the week including Saturdays and Sundays from 10 am to 20pm</li>
                    <li>Interest rate starting from 0%</li>
                    <li>Prepayment starting from 0%</li>
                    <li>Bank service fee ranges from 0,95% depending on the customers’ bank choice</li>
                </ul>
                <h3>“RELQstore ” stores collaborate with all the Armenian leading banks:</h3>
                <ul>
                    <li>«Inecobank» CJSC</li>
                    <li>«Armenian Economy Development bank» OJSC</li>
                    <li>«ACBA-CREDIT AGRICOLE BANK» CJSC</li>
                    <li>«VTB-Armena» CJSC</li>
                    <li>«Ameriabank» CJSC</li>
                </ul>
                <p>For more information please visit our stores or call us.</p>
            </div>
        </div>
    );
};

export default Banks