import { SuccessAlert, ErrorAlert } from '../alert/AlertComponent';
import { useState } from 'react';
import { Button, Cascader, Form, Input, Select } from 'antd';
import Header from '../mainpage/header/Header';
import styles from './Register.module.css';

const { Option } = Select;
const residences = [
  {
    value: 'Armenia',
    label: 'Armenia',
    children: [
      {
        value: 'Yerevan',
        label: 'Yerevan',
      }, {
        value: 'Aragatsotn',
        label: 'Aragatsotn',
      }, {
        value: 'Ararat',
        label: 'Ararat',
      }, {
        value: 'Armavir',
        label: 'Armavir',
      }, {
        value: 'Gegharkunik',
        label: 'Gegharkunik',
      }, {
        value: 'Kotayk',
        label: 'Kotayk',
      }, {
        value: 'Lori',
        label: 'Lori',
      }, {
        value: 'Shirak',
        label: 'Shirak',
      }, {
        value: 'Syunik',
        label: 'Syunik',
      }, {
        value: 'Tavush',
        label: 'Tavush',
      }, {
        value: 'Vayots dzor',
        label: 'Vayots Dzor',
      },
    ],
  },
  {
    value: 'Russia',
    label: 'Russia',
    children: [
      {
        value: 'Moscow',
        label: 'Moscow',
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const validatePassword = (_, value) => {
    if (value && value.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The password must be at least 8 characters long and must contain only uppercase and lowercase letters, numbers and a dot.'));
  };

  const onFinish = async (values) => {
    const userInfo = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      country: values.residence[0],
      region: values.residence[1],
      city: values.city,
      adress: values.adress,
      phone: values.prefix + values.phone,
      gender: values.gender
    };
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInfo })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        window.location.href = "/";
      } else {
        setError(data.error_message);
      };
    }
    catch (error) {
      console.error("Error:", error);
    };
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 90,
        }}
      >
        <Option value="+374">+374</Option>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <Header />
      {message &&
        <SuccessAlert
          message={message}
        />
      }
      {error &&
        <ErrorAlert
          message={error}
        />
      }
      <div className={styles.register}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['Armenia', 'Yerevan'],
            prefix: '+374',
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="firstname"
            label="First name"
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Last name"
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validatePassword,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City or administrative center"
            rules={[
              {
                required: true,
                message: 'Please input your City or Administrative center!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="adress"
            label="Adress"
            rules={[
              {
                required: true,
                message: 'Please input your Adress!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register