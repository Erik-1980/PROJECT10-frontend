import { useState, useEffect } from 'react';
import { Alert, Button, Space } from 'antd';
import styles from './AlertComponent.module.css';

export const SuccessAlert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.alert}>
      <Alert
        message={message}
        type="success"
        showIcon
        closable
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export const ErrorAlert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.alert}>
      <Alert
        message="Error"
        showIcon
        description={message}
        type="error"
        closable
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export const WarningAlert = ({ message }) => (
  <div className={styles.alert}>
    <Alert
      message={message}
      type="warning"
      action={
        <Space>
          <Button size="small" type="ghost">
            Done
          </Button>
        </Space>
      }
      closable
    />
  </div>
);




export const InfoAlert = ({ message, onConfirm, onCancel }) => {
  const [color, setColor] = useState('black');

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) => (prevColor === 'white' ? 'red' : 'white'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const messages = <span style={{ color }}>Warning!!!</span>
  return (
    <div className={styles.alert}>
      <Alert
        className={styles.warning}
        message={messages}
        description={message}
        type="info"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary" onClick={onConfirm} className={styles.accept}>
              Accept
            </Button>
            <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
              Decline
            </Button>
          </Space>
        }
        closable={onCancel}
        onClose={onCancel}
      />
    </div>
  );
};

export const Info = ({ message, onConfirm, onCancel }) => {
   
  const messages = <span>Info</span>
  return (
    <div className={styles.alert}>
      <Alert
        message={messages}
        description={message}
        type="info"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary" onClick={onConfirm} className={styles.accept}>
              Continue
            </Button>
            <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
              Decline
            </Button>
          </Space>
        }
        closable={onCancel}
        onClose={onCancel}
      />
    </div>
  );
};