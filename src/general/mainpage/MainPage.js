import Header from './header/Header';
import CarouselComponent from './carousel/CarouselComponent';
import FeedbackList from './feedbacklist/FeedbackList';
import BestProduct from './bestproduct/BestProduct';

const MainPage = () => {

    return (
        <div>
            <Header />
            <CarouselComponent />
            <BestProduct />
            <FeedbackList />
        </div>
    );
};

export default MainPage;
