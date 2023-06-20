import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ShowProduct.module.css';

const ShowProduct = () => {
    const { id } = useParams();
    const products = useSelector((state) => state.product.products);
    const product = products ? products?.filter(obj => obj.id === parseInt(id)) : null;
    const proporty = product !== null ? Object.entries(JSON.parse(product[0]?.proporties)).map(([key, value], index) => (
        <ul key={index} className={styles.text}>
            <li>{key}: {value}</li>
        </ul>)) : null;

    return (products && <Card
        cover={
            <div style={{marginLeft: '50px'}}>
                <img
                    src={`http://localhost:5000/${product[0].image}`}
                    alt={product[0].name}
                    className={styles.image}
                />
                {product[0].old_price && product[0].old_price > product[0].price ? <img src='/image/price.png' className={styles.priceIcon} style={{ width: '5em' }} alt='' /> : null}
            </div>
        }
    >
        <div className={styles.proporties}>
            <span className={styles.title}>{product[0].name + ' ' + product[0].model}</span>
            <p className={styles.text}>price: {product[0].discount === 0 ? product[0].price + '$' : <del>{product[0].price}$</del>}
                <span style={{ color: 'red', marginLeft: '30px' }}>new price {product[0].discount !== 0 && Math.round((product[0].price - (product[0].price * product[0].discount / 100)) / 10) * 10 - 5 + '$'}</span></p>
            <p className={styles.text}>{product.description}</p>
            {proporty}
        </div>
    </Card>)
};
export default ShowProduct;