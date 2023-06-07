import { setCart } from '../../../redux/slices/cartSlice';
import { verificationToken } from '../../../verificationToken/VerificationToken';

const fetchCart = async (dispatch) => {
    const token = localStorage.getItem('token');
    const url = "http://localhost:5000/cart";
    try {
        const response = await verificationToken(url, {
            headers: {
                Authorization: token,
            }
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(setCart(data.cart));
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

export default fetchCart;