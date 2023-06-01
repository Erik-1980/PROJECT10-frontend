import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Cap.module.css';
import { LoginOutlined, LogoutOutlined, PhoneOutlined, UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import Login from '../../login/Login';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import usersVerify from '../../../../user/verify/UsersVerify';
import { Info } from '../../../alert/AlertComponent';

const Cap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const token = useSelector((state) => state.auth.token);
  let isVerify = false;
  let user = 'account';
  let showLink;
  const confirmIcon = (<CheckCircleTwoTone twoToneColor="#52c41a" />);
  const banIcon = (<CheckCircleTwoTone twoToneColor="#ff0000" />);

  if (token) {
    const decoded = jwt_decode(token);
    isVerify = decoded.verification;
    user = decoded.email;
  };
  const handleVerify = () => {
    setConfirm(true)
  };

  const closeAlert = () => {
    setConfirm(false)
  };

  const handleConfirm = async () => {
    usersVerify();
    setConfirm(false);
  };
  const iconVerify = isVerify ? confirmIcon : banIcon;
  if (token && !isVerify) {
    showLink = <Link onClick={handleVerify}>
      <span className={styles.verify}>{iconVerify}</span>
      <span className={styles.userIcon}><UserOutlined /></span>
      <span className={styles.userName}>{user}</span>
    </Link>
  } else {
    showLink = <span>
      <span className={styles.verify}>{iconVerify}</span>
      <span className={styles.userIcon}><UserOutlined /></span>
      <span className={styles.userName}>{user}</span>
    </span>
  }

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
      {confirm &&
        <Info
          message={'To pass verification, click "Continue"'}
          onConfirm={handleConfirm}
          onCancel={closeAlert}
        />
      }
      <div className={styles.brandName}>
        <span>RELQ<span className={styles.store}>store</span></span>
        <span className={styles.phoneicon}><PhoneOutlined />
          <span className={styles.phonenumber}>099-00-00-00
            {showLink}
            <span className={styles.icon}>{icon}</span>
          </span>
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