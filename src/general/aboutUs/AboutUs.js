import Header from '../mainpage/header/Header';
import styles from './AboutUs.module.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className={styles.aboutUs}>
                <h2>About Us</h2>
                <p><b>''RELQstore''</b> started its activity in Paris in 2011 (then it was called "TechnologyStore" ). In 2015 the store expanded its activity in Yerevan, Tumanyan 2. In 2016 the store in Paris started to offer also household appliances besides digital equipments. On December 15 , 2019 , the store resumed its activity in a larger area - in Yerevan, Tumanyan 2. Currently the store works in new format and with a new name - <b>RELQstore.am.</b> Our stores have always offered high quality and affordable products which proves our 12-year-activity. The stores cooperate with all Armenian banks that have credit partnership and offer <Link to="/banks" className = {styles.link}>special terms</Link> for crediting.</p>
                <img src='../../../image/store1.jpg' alt='store'className={styles.img}/>
                <img src='../../../image/store2.jpg' alt='store'className={styles.img}/>
                <p>In our shop there is a specialized service center, where works of different complicacy are done connected with notebooks, phones and tablets.</p>
                <p>We look forward to seeing you.</p>
            </div>
        </div>
    );
};

export default AboutUs