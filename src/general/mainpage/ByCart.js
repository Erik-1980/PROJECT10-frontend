import MainSceleton from './skeleton/MainSceleton';
import Cart from '../../user/cart/Cart';

const ByCart = () => {

    return (
        <div>
            <MainSceleton content={
                <Cart />} />
        </div>
    );
};
export default ByCart;