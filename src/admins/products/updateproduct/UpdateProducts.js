import { Form, Table, Typography, Input, InputNumber, Select } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UpdateProducts.module.css';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import { SuccessAlert, ErrorAlert, InfoAlert } from '../../../general/alert/AlertComponent';
import fetchProducts from '../getproducts/GetProducts';

const { Option } = Select;

const UpdateProducts = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const product = useSelector((state) => state.product.products);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState();

  const products = product?.map(obj => {
    const { 'category.name': categoryName, ...rest } = obj;
    return { ...rest, category: categoryName, key: obj.id };
  });

  const filteredCategories = categories?.map((category) => {
    const { id, name, description } = category;
    return { key: id, id, name, description };
  });
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let rules = [];
    if (dataIndex === 'brand' || dataIndex === 'name' || dataIndex === 'model' || dataIndex === 'price' || dataIndex === 'quantity' || dataIndex === 'discount') {
      rules = [
        {
          required: true,
          message: `Please Input ${title}!`,
        },
      ];
    }
    const inputNode = inputType === 'number' ? <InputNumber /> : inputType === 'select' ? <Select>{filteredCategories?.map((values) => (
      <Option key={values.id} value={values.id}>{values.name}</Option>
    ))}</Select> : <Input autoComplete="off" />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={rules}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      brand: '',
      model: '',
      description: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async () => {
    setMessage('');
    setError('');
    try {
      const row = await form.validateFields();
      let categ = row.category;
      if (typeof categ === 'string') {
        const foundCategory = filteredCategories.find((obj) => {
          return obj.name === categ;
        });
        if (foundCategory) {
          categ = foundCategory.id;
        };
      }
      const name = row.name;
      const brand = row.brand;
      const model = row.model;
      const price = row.price;
      const quantity = row.quantity;
      const discount = row.discount;
      const description = row.description;
      const categoryId = categ
      const id = editingKey;
      const url = 'http://localhost:5000/product/updateproduct';
      try {
        const response = await verificationToken(url, {
          method: "PUT",
          body: JSON.stringify({ id, name, brand, model, price, quantity, discount, categoryId, description }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
          fetchProducts(dispatch);
          setEditingKey('');
        } else if (data.error) {
          setError(data.error)
        } else {
          setError('something went wrong, please try again later');
        };
      } catch (error) {
        console.error("Error:", error);
        setError('something went wrong, please try again later');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      setError('something went wrong, please try again later');
    };
  };
  const deleteProduct = (id) => {
    setId(id);
    setConfirm(true);
  };
  const closeAlert = () => {
    setConfirm(false)
  }
  const handleDelete = async () => {
    setConfirm(false);
    setMessage('');
    setError('');
    const url = `http://localhost:5000/product/product/${id}`;
    try {
      const response = await verificationToken(url, {
        method: "DELETE",
        headers: {
          Authorization: token,
        }
      });
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
        fetchProducts(dispatch);
      };
      if (data.error) {
        setError(data.error)
      };
      if (data.message_error) {
        setError(data.message_error)
      };
    } catch (error) {
      console.error("Error:", error);
      setError('something went wrong, please try again later');
    };
  };
  const columns = [];

  if (products) {
    Object.keys(products[0]).forEach((key) => {
      if (key === 'name' || key === 'brand' || key === 'model' || key === 'price' || key === 'quantity' || key === 'discount' || key === 'description' || key === 'category' || key === 'image') {
        const column = {
          key: key,
          title: key,
          dataIndex: key,
          width: key === 'description' || key === 'model' ? '13%' : '8%',
          editable: true,
          render: (text, record) => {
            if (key === 'image') {
              return <img src={`http://localhost:5000/${text}`} alt={record.name} width={40} />;
            } else {
              return text;
            }
          },
        };
        columns.push(column);
      };
    });
    columns.push(
      {
        title: 'edit',
        dataIndex: 'edit',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 30,
                }}
              >
                <SaveOutlined />
              </Typography.Link>
              <Typography.Link onClick={cancel}><CloseOutlined /></Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined />
            </Typography.Link>
          );
        },
      },
      {
        title: 'delete',
        dataIndex: 'delete',
        render: (_, record) => (
          <Typography.Link onClick={() => deleteProduct(record.id)}>
            <DeleteOutlined />
          </Typography.Link>
        ),
      }
    )
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'price' || col.dataIndex === 'quantity' || col.dataIndex === 'discount' ? 'number' : col.dataIndex === 'category' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles.main}>
      <Form form={form} component={false}>
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
          {confirm &&
            <InfoAlert
              message={'When deleting a category, you will also delete all products associated with that category'}
              onConfirm={handleDelete}
              onCancel={closeAlert}
            />
          }
        </>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={products}
          columns={mergedColumns}
          rowClassName={styles.page}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};
export default UpdateProducts;