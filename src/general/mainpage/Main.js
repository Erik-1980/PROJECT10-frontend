import { Layout, Menu } from 'antd';
import React from 'react';
import HeaderContent from './header/HeaderContent';
import CarouselComponent from './carousel/CarouselComponent';
import BestProduct from './bestproduct/BestProduct';
import { useSelector } from 'react-redux';
import styles from './Main.module.css';


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
                        width={220}
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
                            <BestProduct />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
export default Main;