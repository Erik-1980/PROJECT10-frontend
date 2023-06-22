import { Card, Col, Row } from 'antd';
import styles from './Order.module.css';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const Order = () => {
    const products = useSelector((state) => state.product.products);
    const orders = useSelector((state) => state.order.orders);
    const filteredProduct = products?.filter(product => {
        const matchingOrder = orders?.find(order => order.productId === product.id);
        return matchingOrder;
    }).map(product => {
        const matchingOrder = orders?.find(order => order.productId === product.id);
        return {
            ...product,
            order_status: matchingOrder.order_status,
            orderQuantity: matchingOrder.quantity
        };
    });

    return (
        <div className={styles.main}>
            <Row gutter={16}>
                {filteredProduct?.map((prod) => {
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
                            >
                                <Meta style={{ marginTop: '10px' }}
                                    title={<span style={{ color: 'black', position: 'absolute', marginTop: '-22px', marginLeft: '-10px', fontFamily: 'fantasy', fontWeight: '400' }}>{prod.name}  {prod.model}</span>}
                                    description={<span style={{ color: 'black', position: 'absolute', marginTop: '-5px', marginLeft: '-10px', fontFamily: 'fantasy' }}>price:
                                        <span style={{ color: 'red', marginLeft: '10px' }}>{prod.discount !== 0 && Math.round((prod.price - (prod.price * prod.discount / 100)) / 10) * 10 - 5 + '$'}
                                        </span>
                                        <p>Order status: <span style={{color: 'red'}}>{prod.order_status}</span></p>
                                        <p style={{lineHeight: '0'}}>Quantity: {prod.orderQuantity}</p>
                                    </span>
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })};
            </Row>
        </div>
    );
};
export default Order;