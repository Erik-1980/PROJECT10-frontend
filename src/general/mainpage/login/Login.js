import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ErrorAlert } from '../../alert/AlertComponent';

const Login = () => {
  const [error, setError] = useState();
  const onFinish = async (values) => {
    setError();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.reload()
      };
      if (data.message_error) {
        setError(data.message_error)
      };
    }
    catch (error) {
      console.error("Error:", error);
    };
  };
  return (
    <div>
      <>
        {error &&
          <ErrorAlert
            message={error}
          />
        }
      </>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login