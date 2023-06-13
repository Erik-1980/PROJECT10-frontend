import { Button, Form, Input, InputNumber, Upload, Select, Checkbox } from 'antd';
import styles from './CreateProducts.module.css';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { SuccessAlert, ErrorAlert } from '../../../general/alert/AlertComponent';
import fetchProducts from '../getproducts/GetProducts';
import { CreateProporties } from './proporties/CreateProporties';
import { setProporty } from '../../../redux/slices/proportySlice';

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.category.categories);
  const proporties = useSelector((state) => state.proporty.proporties);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setMessage('');
    setError('');
    const url = 'http://localhost:5000/product/product';
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('best', isChecked);
      formData.append('name', values.name);
      formData.append('model', values.model);
      formData.append('discount', values.discount);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);
      formData.append('proporties', JSON.stringify(proporties));
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
        fetchProducts(dispatch);
        dispatch(setProporty());
        form.resetFields();
        setIsChecked(false)
      } else if (data.message_error) {
        setError(data.message_error);
      } else if (data.error) {
        setError(data.error)
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

  const showAlertProporties = () => {
    dispatch(setProporty());
    setShowModal(true)
  };

  const closeAlertProporties = () => {
    setShowModal(false)
  }

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
          name="best"
          label={
            <span className={styles.label}>
              best
            </span>
          }
          valuePropName="checked"
        >
          <Checkbox
            style={{ color: 'white' }}
            onChange={(element) => setIsChecked(element.target.checked)}
          >
            show product on homepage</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button style={{ backgroundColor: 'red', fontFamily: 'fantasy' }} onClick={showAlertProporties}>
            additional proporties
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '100px', fontFamily: 'fantasy' }}>
            create product
          </Button>
        </Form.Item>
      </Form>
      {showModal && <CreateProporties categoryId={form.getFieldValue('categoryId')} onCancel={closeAlertProporties} onConfirm={closeAlertProporties} />}

    </div>
  );
};
