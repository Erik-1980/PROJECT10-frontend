import { AppstoreOutlined, BankOutlined, HomeOutlined, LikeOutlined, CarOutlined } from '@ant-design/icons';
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
  getItem('update', 'sub1', <AppstoreOutlined />, [
    getItem(<Link to="/admin/updatecategory">category</Link>, '7'),
    getItem(<Link to="/admin/updateproduct">product</Link>, '8'),
  ])
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