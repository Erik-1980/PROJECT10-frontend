import Cap from '../../general/mainpage/header/cap/Cap';
import MenuAdmin from './menu/MenuAdmin';
import styles from './HeaderAdmin.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <Cap />
            <MenuAdmin />
        </div>
    )
};

export default Header;