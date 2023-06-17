import MainSceleton from './skeleton/MainSceleton';
import CarouselComponent from './carousel/CarouselComponent';
import BestProducts from './bestproduct/BestProducts';
import FeedbackList from './feedbacklist/FeedbackList';

const Main = () => {

    return (
        <div>
            <MainSceleton content={[
                <CarouselComponent key="carousel" />,
                <BestProducts key="best-products" />,
                <FeedbackList key="feedback-list" />
            ]} />
        </div>
    );
};
export default Main;