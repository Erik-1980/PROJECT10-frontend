import { Modal } from 'antd';
import styles from './Cap.module.css';
import { LoginOutlined, LogoutOutlined, PhoneOutlined } from '@ant-design/icons';
import Login from '../../login/Login';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Cap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  };

  const icon = token ? (
    <LogoutOutlined onClick={handleLogout} />
  ) : (
    <LoginOutlined onClick={handleModalToggle} />
  );

  return (
    <div className={styles.main}>
      <div className={styles.brandName}>
        <span>
          RELQ<span className={styles.store}>store</span>
          <span className={styles.phoneicon}><PhoneOutlined /><span className={styles.phonenumber}>099-00-00-00 <span className={styles.icon}>{icon}</span></span></span>
        </span>
      </div>
      <div>
        <Modal
          title="Login/Register"
          open={modalVisible}
          onCancel={handleModalToggle}
          footer={null}
        >
          <Login />
        </Modal>
      </div>
    </div >
  );
};

export default Cap;
