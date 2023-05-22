import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { admins } from '../../../../config/SetAdmin';
import { AppstoreOutlined, BankOutlined, HomeOutlined, LikeOutlined, MailOutlined, DollarOutlined, CarOutlined, UserOutlined } from '@ant-design/icons';
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
    getItem('category', 'sub1', <AppstoreOutlined />, [
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('price', 'sub2', <DollarOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
    ]),
    admin && getItem(<Link to="/admin">admin</Link>, '11', <UserOutlined />),
  ];

  return (
    <div>
      <Menu className={styles.menu}
        mode="horizontal"
        theme="dark"
        items={items}
      />
    </div>
  );
};
export default MenuComponent;