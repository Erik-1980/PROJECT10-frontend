import { LikeOutlined, HeartOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip } from 'antd';
import styles from './BestProducts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { SuccessAlert, ErrorAlert } from '../../../general/alert/AlertComponent';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import fetchCart from '../../../user/cart/getcart/GetCart';

const { Meta } = Card;

const BestProducts = () => {

  const products = useSelector((state) => state.product.products);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
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
        fetchCart(dispatch);
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
    <div className={styles.page}>
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
        {products?.map((product) => {
          if (product.quantity === 0) {
            return null;
          }
          return (
            <Col key={product.id} className={styles.column} style={{ padding: '1px' }}>
              <Card
                cover={
                  <>
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.name}
                      className={styles.image}
                    />
                    <img src='/image/hit1.png' className={styles.bestIcon} style={{ width: '22em' }} alt='' />
                    {product.old_price && product.old_price > product.price ? <img src='/image/price.png' className={styles.priceIcon} style={{ width: '5em' }} alt='' /> : null }
                    
                  </>
                }
                actions={[
                  <Tooltip title='Add to cart'><HeartOutlined key={product.id} style={{ color: 'red', fontWeight: 'bold' }} onClick={() => addToCart(product.id)} /></Tooltip>,
                  <span style={{ color: 'red', fontWeight: 'bold' }}><LikeOutlined key={product.id} />buy now</span>,
                ]}
              >
                <Meta
                  title={<span style={{ color: 'black', position: 'absolute', marginTop: '-12px', marginLeft: '-10px' }}>{product.name}  {product.model}</span>}
                  description={
                    <span style={{ color: 'black', position: 'absolute', fontWeight: 'bold', marginLeft: '-10px' }}>
                      price: {product.discount === 0 ? product.price + '$' : <del>{product.price}$</del>}
                      <span style={{ color: 'red', marginLeft: '10px' }}>{product.discount !== 0 && Math.round((product.price - (product.price * product.discount / 100)) / 10) * 10 - 5 + '$'}
                      </span>
                    </span>
                  }
                />
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
};
export default BestProducts;