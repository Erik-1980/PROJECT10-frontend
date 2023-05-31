import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import styles from './CreateCategories.module.css';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import { useSelector, useDispatch } from 'react-redux';
import { SuccessAlert, ErrorAlert } from '../../../general/alert/AlertComponent';
import fetchCategories from '../getcategories/GetCategories';

function CreateCategory() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form] = Form.useForm();


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  const onFinish = async (values) => {
    const name = values.category;
    const description = values.description;
 
    setMessage('');
    setError('');
    if (name.trim() === '') {
      return;
    }
    const url = 'http://localhost:5000/product/category';
    try {
      const response = await verificationToken(url, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
        form.resetFields(['category', 'description']);
        fetchCategories(dispatch);
      } else if (data.message_error) {
        setError(data.message_error);
      } else if(data.error) {
        setError(data.error)
      } else {
        setError('something went wrong, please try again later');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.category}>
      <>
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
      </>
      <Form 
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <h2 className={styles.header}>Create category</h2>
        <Form.Item
          name="category"
          label={
            <span className={styles.label}>
              category
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product category!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label={
            <span className={styles.label}>
              description
            </span>
          }
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            create category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateCategory;
