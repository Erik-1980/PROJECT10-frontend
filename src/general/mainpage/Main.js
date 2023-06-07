import { Layout, Menu } from 'antd';
import React from 'react';
import HeaderContent from './header/HeaderContent';
import CarouselComponent from './carousel/CarouselComponent';
import BestProducts from './bestproduct/BestProducts';
import { useSelector } from 'react-redux';
import styles from './Main.module.css';
import FeedbackList from './feedbacklist/FeedbackList';

const Main = () => {
    const { Content, Sider } = Layout;
    const categories = useSelector((state) => state.category.categories);
    const items = categories?.map((obj) => {
        return {
            className: styles.item,
            key: obj.id,
            // icon: React.createElement(icon),
            label: obj.name
        };
    });

    return (
        <div className={styles.main}>
            <Layout>
                <HeaderContent />
                <Layout>
                    <Sider
                        width={200}
                    >
                        <Menu className={styles.menu}
                            items={items}
                            theme='dark'
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Content className={styles.content} >
                            <CarouselComponent />
                            <BestProducts />
                            <FeedbackList />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
export default Main;