import { Button, Form, Input, InputNumber, Upload, Select } from 'antd';
import styles from './CreateProducts.module.css';
import { verificationToken } from '../../../VerificationToken';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SuccessAlert, ErrorAlert } from '../../../general/alert/AlertComponent';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export default function CreateProducts() {
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.category.categories);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setMessage('');
    setError('');
    const url = 'http://localhost:5000/product/product';
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('brand', values.brand);
      formData.append('name', values.name);
      formData.append('model', values.model);
      formData.append('discount', values.discount);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);
      const response = await verificationToken(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
        form.resetFields();
      } else if (data.message_error) {
        setError(data.message_error);
      } else {
        setError('something went wrong, please try again later');
      }
    } catch (error) {
      console.error("Error:", error);
    };
  };
  const handleImageUpload = (file) => {
    setImage(file.file);
  };

  return (
    <div className={styles.products}>
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
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <h2 className={styles.header}>Create product</h2>
        <Form.Item
          name="brand"
          label={
            <span className={styles.label}>
              brand
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product brand!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={
            <span className={styles.label}>
              name
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="model"
          label={
            <span className={styles.label}>
              model
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product model!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label={
            <span className={styles.label}>
              price
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product price!',
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={
            <span className={styles.label}>
              quantity
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input product quantity!',
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="discount"
          label={
            <span className={styles.label}>
              discount
            </span>
          }
          rules={[
            {
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="image"
          label={
            <span className={styles.label}>
              image
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please upload product image!',
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload beforeUpload={() => false} onChange={handleImageUpload}>
            <Button>upload image</Button>
          </Upload>
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
          name="categoryId"
          label={
            <span className={styles.label}>
              category
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please select product category!',
            },
          ]}
        >
          <Select placeholder='please select a category'>
            {categories?.map((values) => (
              <Option key={values.id} value={values.id}>{values.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            create product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};