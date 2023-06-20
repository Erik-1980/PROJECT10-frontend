import styles from './CarouselComponent.module.css';
import { Carousel } from 'antd';

const CarouselComponent = () => {
    return (
        <Carousel autoplay className={styles.contentStyleCarousel}>
            <div>
                <h3 style={{ backgroundImage: 'url("../../../../image/1fon1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} aria-hidden="true"></h3>
            </div>
            <div>
                <h3 style={{ backgroundImage: 'url("../../../../image/1fon2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} aria-hidden="true"></h3>
            </div>
            <div>
                <h3 style={{ backgroundImage: 'url("../../../../image/1fon3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} aria-hidden="true"></h3>
            </div>
            <div>
                <h3 style={{ backgroundImage: 'url("../../../../image/1fon6.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} aria-hidden="true"></h3>
            </div>
            <div>
                <h3 style={{ backgroundImage: 'url("../../../../image/1fon7.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} aria-hidden="true"></h3>
            </div>
        </Carousel>
    );
};

export default CarouselComponent;
