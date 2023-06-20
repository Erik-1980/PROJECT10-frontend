import { setOrder } from '../../../redux/slices/orderSlice';
import { verificationToken } from '../../../verificationToken/VerificationToken';

const fetchOrder = async (dispatch) => {
    const token = localStorage.getItem('token');
    const url = "http://localhost:5000/order";
    try {
        const response = await verificationToken(url, {
            headers: {
                Authorization: token,
            }
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(setOrder(data.orders));
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

export default fetchOrder;