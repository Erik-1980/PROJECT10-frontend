import Cap from '../../general/mainpage/header/cap/Cap';
import MenuAdmin from './menu/MenuAdmin';
import styles from './HeaderAdmin.module.css';
import { Layout } from 'antd';

const HeaderAdmin = () => {
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
            <MenuAdmin />
        </div>
    )
};

export default HeaderAdmin;