import { Form, Table, Typography, Input } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './UpdateCategories.module.css';
import { verificationToken } from '../../../VerificationToken';
import { SuccessAlert, ErrorAlert, InfoAlert } from '../../../general/alert/AlertComponent';
import { getCategories } from '../getcategories/GetCategories'

const UpdateCategories = () => {
  const categories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState();
  const filteredCategories = categories?.map((category) => {
    const { id, name, description } = category;
    return { key: id, id, name, description };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    // inputType,
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
            <Input />
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
          await getCategories();
          setEditingKey('');
        } else {
          setError('something went wrong, please try again later');
        }
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
        await getCategories();
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
          width: '40%',
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
                  marginRight: 8,
                }}
              >
                change
              </Typography.Link>
              <Typography.Link onClick={cancel}>cancel</Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              edit
            </Typography.Link>
          );
        },
      },
      {
        title: 'delete',
        dataIndex: 'delete',
        render: (_, record) => (
          <Typography.Link onClick={() => deleteCategory(record.id)}>
            delete
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
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
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
  );
};
export default UpdateCategories;