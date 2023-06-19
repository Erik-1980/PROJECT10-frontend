import { LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, InputNumber } from 'antd';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SuccessAlert, ErrorAlert } from '../../general/alert/AlertComponent';
import { verificationToken } from '../../verificationToken/VerificationToken';
import fetchCart from '../../user/cart/getcart/GetCart';

const { Meta } = Card;

const Cart = () => {

    const products = useSelector((state) => state.cart.carts);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);


    const removeFromCart = async (id) => {
        setMessage('');
        setError('');
        const url = `http://localhost:5000/cart/${id}`;
        try {
            const response = await verificationToken(url, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                }
            });
            const data = await response.json();
            if (data.message) {
                setMessage(data.message);
                fetchCart(dispatch);
            };
            if (data.message_error) {
                setError(data.message_error)
            };
        } catch (error) {
            console.error("Error:", error);
            setError('something went wrong, please try again later');
        };
    };

    const handleInputQuantity = (value) => {
        setQuantity(value);
    };


    return (
        <div className={styles.main}>
            {message &&
                <SuccessAlert
                    message={message}
                />
            }
            {error &&
                <ErrorAlert
                    message={error}
                />
            }
            <Row gutter={16}>
                {products?.map((element) => {
                    const prod = element.product
                    return (
                        <Col key={prod.id} className={styles.column} style={{ padding: '1px' }}>
                            <Card
                                cover={
                                    <>
                                        <img
                                            src={`http://localhost:5000/${prod.image}`}
                                            alt={prod.name}
                                            className={styles.image}
                                        />
                                    </>
                                }
                                actions={[
                                    <Tooltip title='Remove from cart'><DeleteOutlined key={prod.id} style={{ color: 'red', fontWeight: 'bold' }} onClick={() => removeFromCart(element.id)} /></Tooltip>,
                                    <Link to={`/payment?productid=${prod.id}&quantity=${quantity}`} >
                                        <span style={{ color: 'red', fontFamily: 'fantasy' }}>
                                            <LikeOutlined key={prod.id} />
                                            buy now
                                        </span>
                                    </Link>
                                ]}
                            >
                                <Meta style={{ marginTop: '10px' }}
                                    title={<span style={{ color: 'black', position: 'absolute', marginTop: '-42px', marginLeft: '-10px', fontFamily: 'fantasy', fontWeight: '400' }}>{prod.name}  {prod.model}</span>}
                                    description={<span style={{ color: 'black', position: 'absolute', marginTop: '-26px', marginLeft: '-10px', fontFamily: 'fantasy' }}>price: {prod.discount === 0 ? prod.price + '$' : <del>{prod.price}$</del>}
                                        <span style={{ color: 'red', marginLeft: '10px' }}>{prod.discount !== 0 && Math.round((prod.price - (prod.price * prod.discount / 100)) / 10) * 10 - 5 + '$'}
                                        </span>
                                    </span>
                                    }
                                />
                                <span className={styles.numberInput}>quantity:
                                    <InputNumber name='number' className={styles.number} size="small" min={1} max={1000} defaultValue={element.quantity} onChange={handleInputQuantity} /></span>
                            </Card>
                        </Col>
                    );
                })};
            </Row>
        </div>
    );
};
export default Cart;