import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './ShowCategory.module.css';
import { SuccessAlert, ErrorAlert } from '../../../general/alert/AlertComponent';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import fetchCart from '../../../user/cart/getcart/GetCart';
import { useParams } from 'react-router-dom';
import { LikeOutlined, HeartOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const ShowCategory = () => {
    const { Meta } = Card;
    const { id } = useParams();
    const products = useSelector((state) => state.product.products);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProductByCategory = products ? products?.filter(obj => obj.categoryId === parseInt(id)) : null;

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = filteredProductByCategory?.slice(startIndex, endIndex);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

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
                {displayedProducts?.map((product) => {
                    if (product.quantity === 0) {
                        return null;
                    }
                    return (
                        <Col key={product.id} className={styles.column} style={{ padding: '1px' }}>
                            <Card
                                cover={
                                    <>
                                        <Link to={`/showproduct/${product.id}`}>
                                            <img
                                                src={`http://localhost:5000/${product.image}`}
                                                alt={product.name}
                                                className={styles.image}
                                            />
                                        </Link>
                                        {product.best === 1 && <img src='/image/hit1.png' className={styles.bestIcon} style={{ width: '22em' }} alt='' />}
                                        {product.old_price && product.old_price > product.price ? <img src='/image/price.png' className={styles.priceIcon} style={{ width: '5em' }} alt='' /> : null}

                                    </>
                                }
                                actions={[
                                    <Tooltip title='Add to cart'><HeartOutlined key={product.id} style={{ color: 'red', fontWeight: 'bold' }} onClick={() => addToCart(product.id)} /></Tooltip>,
                                    <Link to={`/payment?productid=${product.id}&quantity=1`} >
                                        <span style={{ color: 'red', fontFamily: 'fantasy' }}>
                                            <LikeOutlined key={product.id} />
                                            buy now
                                        </span>
                                    </Link>
                                ]}
                            >
                                <Meta
                                    title={<span style={{ color: 'black', position: 'absolute', marginTop: '-12px', marginLeft: '-10px', fontFamily: 'fantasy', fontWeight: '400' }}>{product.name}  {product.model}</span>}
                                    description={
                                        <span style={{ color: 'black', position: 'absolute', marginLeft: '-10px', fontFamily: 'fantasy' }}>
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
            <Pagination
                current={currentPage}
                total={filteredProductByCategory?.length}
                pageSize={itemsPerPage}
                onChange={handleChangePage}
                className={styles.pagination}
            />
        </div>
    )
};
export default ShowCategory;