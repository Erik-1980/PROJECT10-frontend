import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const Login = ({onclick}) => {
  const onFinish = async (values) => {
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
    }
    catch (error) {
      console.error("Error:", error);
    };
  };
  return (
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
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={onclick}>
          Log in
        </Button>
        Or <Link to='/register'>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login