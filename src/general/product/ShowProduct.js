import { Card, Tooltip } from 'antd';
import { LikeOutlined, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ShowProduct.module.css';
import { verificationToken } from '../../verificationToken/VerificationToken';
import { SuccessAlert, ErrorAlert } from '../../general/alert/AlertComponent';


const { Meta } = Card;

const ShowProduct = () => {
    const { id } = useParams();
    const products = useSelector((state) => state.product.products);
    const token = useSelector((state) => state.auth.token);
    const product = products ? products?.filter(obj => obj.id === parseInt(id)) : [];

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const addToCart = async (id) => {
        setMessage('');
        setError('');
        const url = `http://localhost:5000/cart/${id}`;
        try {
            const response = await verificationToken(url, {
                headers: {
                    Authorization: token,
                }
            });
            const data = await response.json();
            if (data.message) {
                setMessage(data.message);
            };
            if (data.message_error) {
                setError(data.message_error)
            };
        } catch (error) {
            console.error("Error:", error);
            setError('something went wrong, please try again later');
        };
    }

    return (
        <div>
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
            {products && <Card
                cover={
                    <>
                        <img
                            src={`http://localhost:5000/${product[0].image}`}
                            alt={product[0].name}
                            className={styles.image}
                        />
                        <img src='/image/hit1.png' className={styles.bestIcon} style={{ width: '22em' }} alt='' />
                        {product[0].old_price && product[0].old_price > product[0].price ? <img src='/image/price.png' className={styles.priceIcon} style={{ width: '5em' }} alt='' /> : null}

                    </>
                }
                actions={[
                    <Tooltip title='Add to cart'><HeartOutlined key={product[0].id} style={{ color: 'red', fontWeight: 'bold' }} onClick={() => addToCart(product[0].id)} /></Tooltip>,
                    <span style={{ color: 'red', fontFamily: 'fantasy' }}><LikeOutlined key={product[0].id} />buy now</span>,
                ]}
            >
                <Meta
                    title={<span style={{ color: 'black', position: 'absolute', marginTop: '-12px', marginLeft: '-10px', fontFamily: 'fantasy', fontWeight: '400' }}>{product[0].name}  {product[0].model}</span>}
                    description={
                        <span style={{ color: 'black', position: 'absolute', marginLeft: '-10px', fontFamily: 'fantasy' }}>
                            price: {product[0].discount === 0 ? product[0].price + '$' : <del>{product[0].price}$</del>}
                            <span style={{ color: 'red', marginLeft: '10px' }}>{product[0].discount !== 0 && Math.round((product[0].price - (product[0].price * product[0].discount / 100)) / 10) * 10 - 5 + '$'}
                            </span>
                        </span>
                    }
                />
            </Card>}
        </div>
    )
};
export default ShowProduct;