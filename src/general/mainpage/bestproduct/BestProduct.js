import { Card, Col, Row } from 'antd';
import styles from './BestProduct.module.css';
import { useSelector } from 'react-redux';

const BestProduct = () => {
    const products = useSelector((state) => state.product.products);
    return (
        <div className={styles.page}>
            <Row gutter={16}>
            {products?.map((product) => (
                <Col span={6} key={product.id}>
                <Card className={styles.card}
                    cover={<img className={styles.cover} src={`http://localhost:5000/${product.image}`} alt={product.name} />}
                    title={product.name}
                >
                    {product.description}
                </Card>
            </Col>
                ))}
            </Row>
        </div>
    );
};

export default BestProduct;
