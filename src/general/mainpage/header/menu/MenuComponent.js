import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { admins } from '../../../../config/SetAdmin';
import { AppstoreOutlined, BankOutlined, HomeOutlined, LikeOutlined, MailOutlined, DollarOutlined, CarOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './MenuComponent.module.css';
import { Link } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuComponent = () => {

  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.cart.carts);
  const getEmailFromToken = () => {
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.email;
    }
    return null;
  };
  const email = getEmailFromToken();
  const admin = admins.find((value) => {
    return value === email;
  });

  const items = [
    getItem(<Link to="/">home</Link>, '1', <HomeOutlined />),
    getItem(<Link to="/about">about Us</Link>, '2', <LikeOutlined />),
    getItem(<Link to="/banks">credit terms</Link>, '3', <BankOutlined />),
    getItem(<Link to="/delivery">delivery and payments</Link>, '4', <CarOutlined />),
    getItem('write to Us', '5', <MailOutlined />),
    getItem('category', 'sub1', <AppstoreOutlined />,
      categories?.map((value) => {
        const link = <Link to={`/showcategory/${value.id}`} key={value.id}>{value.name}</Link>
        return getItem(link, 'category' + value.id)

      })
    ),
    getItem('price', 'sub2', <DollarOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
    ]),
    admin && getItem(<Link to="/admin">admin</Link>, '11', <UserOutlined />)
  ];

  return (
    <div className={styles.main}>
      <Menu className={styles.menu}
        mode="horizontal"
        theme="dark"
        items={items}
      />
      {token && <Link to="/cart" className={styles.cart}><span className={styles.cartscount}>{products?.length}</span><ShoppingCartOutlined /></Link>}
    </div>
  );
};
export default MenuComponent;