import Cap from './cap/Cap';
import MenuComponent from './menu/MenuComponent';
import styles from './HeaderContent.module.css';
import { Layout } from 'antd';

const HeaderContent = () => {
    const { Header } = Layout;
    return (
        <div className={styles.header}>
            <Header
                style={{
                    paddingLeft: '0px'
                }}
            >
                <Cap />
            </Header>
            <MenuComponent />
        </div>
    );
};
export default HeaderContent;