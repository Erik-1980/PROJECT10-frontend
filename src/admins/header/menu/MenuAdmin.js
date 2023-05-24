import { AppstoreOutlined, BankOutlined, HomeOutlined, LikeOutlined, DollarOutlined, CarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './MenuAdmin.module.css';
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

const items = [
  getItem(<Link to="/">main</Link>, '1', <HomeOutlined />),
  getItem(<Link to="/admin">home</Link>, '2', <LikeOutlined />),
  getItem(<Link to="/admin/users">users</Link>, '3', <BankOutlined />),
  getItem(<Link to="/admin/create">create</Link>, '4', <CarOutlined />),
  getItem(<Link to="/admin/orders">orders</Link>, '5', <CarOutlined />),
  getItem(<Link to="/admin/update">update</Link>, '6', <CarOutlined />),
  getItem('category', 'sub1', <AppstoreOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('price', 'sub2', <DollarOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
];

const MenuAdmin = () => {

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
export default MenuAdmin;