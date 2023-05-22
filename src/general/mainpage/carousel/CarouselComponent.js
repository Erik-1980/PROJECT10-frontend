import styles from './CarouselComponent.module.css';
import { Carousel } from 'antd';

const CarouselComponent = () => {
    return(
        <Carousel autoplay className={styles.contentStyleCarousel}>
                <div>
                    <h3 style={{ backgroundImage: 'url("../../../../image/mainpage.jpeg")' }}>1</h3>
                </div>
                <div>
                    <h3 style={{ backgroundImage: 'url("../../../../image/mainpage2.jpeg")' }}>2</h3>
                </div>
                <div>
                    <h3 style={{ backgroundImage: 'url("../../../../image/mainpage3.jpeg")' }}>3</h3>
                </div>
                <div>
                    <h3 style={{ backgroundImage: 'url("../../../../image/mainpage4.jpeg")' }}>4</h3>
                </div>
            </Carousel>
    )
};

export default CarouselComponent