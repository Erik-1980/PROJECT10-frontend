import { Form, Popconfirm, Table, Typography, Input } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './UpdateCategories.module.css';

const UpdateCategories = () => {
  const categories = useSelector((state) => state.category.categories);
  const filteredCategories = categories.map((category) => {
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
    console.log(record);
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = (id) => {
    // const updatedCategories = categories.filter((category) => category.id !== id);
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
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Typography.Link>Cancel</Typography.Link>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      },
      {
        title: 'delete',
        dataIndex: 'delete',
        render: (_, record) => (
          <Typography.Link onClick={() => handleDelete(record.id)}>
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