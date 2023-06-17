import { Layout, Menu } from 'antd';
import React from 'react';
import HeaderContent from '../header/HeaderContent';
import { useSelector } from 'react-redux';
import styles from './MainSceleton.module.css';
import { Link } from 'react-router-dom';

const Main = ({content}) => {
    const { Content, Sider } = Layout;
    const categories = useSelector((state) => state.category.categories);
    const items = categories?.map((obj) => {
        return {
            className: styles.item,
            key: obj.id,
            // icon: React.createElement(icon),
            label:
                <Link to={`/showcategory/${obj.id}`}>
                    {obj.name}
                </Link>
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
                            {content}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
export default Main;