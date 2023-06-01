import { Form, Table, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UpdateCategories.module.css';
import { verificationToken } from '../../../verificationToken/VerificationToken';
import { SuccessAlert, ErrorAlert, InfoAlert } from '../../../general/alert/AlertComponent';
import fetchCategories from '../getcategories/GetCategories';

const UpdateCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState('');
  const filteredCategories = categories?.map((category) => {
    const { id, name, description } = category;
    return { key: id, id, name, description };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    let rules = [];
    if (dataIndex === 'name') {
      rules = [
        {
          required: true,
          message: `Please Input ${title}!`,
        },
      ];
    }
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
            <Input autoComplete="off" />
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
      const name = row.name;
      const description = row.description;
      const id = editingKey;
      const url = 'http://localhost:5000/product/updatecategory';
      try {
        const response = await verificationToken(url, {
          method: "PUT",
          body: JSON.stringify({ id, name, description }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
          fetchCategories(dispatch);
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
  const deleteCategory = (id) => {
    setId(id)
    setConfirm(true);
  };
  const closeAlert = () => {
    setConfirm(false)
  }
  const handleDelete = async () => {
    setConfirm(false);
    setMessage('');
    setError('');
    const url = `http://localhost:5000/product/category/${id}`;
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
        fetchCategories(dispatch);
      };
      if (data.error) {
        setError(data.error)
      };
    } catch (error) {
      console.error("Error:", error);
      setError('something went wrong, please try again later');
    };
  };
  const columns = [];

  if (categories) {
    Object.keys(categories[0]).forEach((key) => {
      if (key === 'name' || key === 'description') {
        const column = {
          key: key,
          title: key,
          dataIndex: key,
          width: '42%',
          editable: true,
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
                  paddingRight: 30
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
          <Typography.Link onClick={() => deleteCategory(record.id)}>
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
          dataSource={filteredCategories}
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
export default UpdateCategories;