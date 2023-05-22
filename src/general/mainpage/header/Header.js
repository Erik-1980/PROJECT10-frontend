import Cap from "./cap/Cap";
import MenuComponent from "./menu/MenuComponent";
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <Cap />
            <MenuComponent />
        </div>
    )
};

export default Header;