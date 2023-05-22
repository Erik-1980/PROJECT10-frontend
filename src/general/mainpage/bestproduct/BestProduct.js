import { Card, Col, Row } from 'antd';
import styles from './BestProduct.module.css';



const BestProduct = () => {

   

    return (
        <div className={styles.page}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card className={styles.card}
                        cover={<img className={styles.cover} src="path/to/product1.jpg" alt="Продукт 1" />}
                        title="Название продукта 1"
                    >
                        Описание продукта 1
                    </Card>
                </Col>
                <Col span={8}>
                <Card className={styles.card}
                        cover={<img className={styles.cover} src="path/to/product1.jpg" alt="Продукт 1" />}
                        title="Название продукта 1"
                    >
                        Описание продукта 1
                    </Card>
                </Col>
                <Col span={8}>
                <Card className={styles.card}
                        cover={<img className={styles.cover} src="path/to/product1.jpg" alt="Продукт 1" />}
                        title="Название продукта 1"
                    >
                        Описание продукта 1
                    </Card>
                </Col>
            </Row>

            
        </div>
    );
};

export default BestProduct;
