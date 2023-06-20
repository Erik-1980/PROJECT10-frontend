import { Form, Table, Typography, Input, Select } from 'antd';
import { EditOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Orders.module.css';
import { verificationToken } from '../../verificationToken/VerificationToken';
import { SuccessAlert, ErrorAlert, InfoAlert } from '../../general/alert/AlertComponent';

const { Option } = Select;

const UpdateProducts = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const product = useSelector((state) => state.product.products);
    const token = useSelector((state) => state.auth.token);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const url = `http://localhost:5000/user`;
            try {
                const response = await verificationToken(url, {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    const users_info = data.users;
                    setUsers(users_info);
                };
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUsers();
    }, [token]);

    const products = product?.map(obj => {
        const { 'category.name': categoryName, ...rest } = obj;
        return { ...rest, category: categoryName, key: obj.id };
    });

    // const filteredCategories = categories?.map((category) => {
    //     const { id, name, description } = category;
    //     return { key: id, id, name, description };
    // });

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
        const inputNode = inputType === 'select' ? <Select>{orders?.map((values) => (
            <Option key={values.id} value={values.id}>{values.name}</Option>
        ))}</Select> : <Input autoComplete="off" />
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
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
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
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
            // if (typeof categ === 'string') {
            //     const foundCategory = filteredCategories.find((obj) => {
            //         return obj.name === categ;
            //     });
            //     if (foundCategory) {
            //         categ = foundCategory.id;
            //     };
            // }
            const order_status = categ
            const id = editingKey;
            const url = 'http://localhost:5000/product/updateorder';
            try {
                const response = await verificationToken(url, {
                    method: "PUT",
                    body: JSON.stringify({ id, order_status }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });
                const data = await response.json();
                if (data.message) {
                    setMessage(data.message);
                    // fetchProducts(dispatch);
                    setEditingKey('');
                } else if (data.message_error) {
                    setError(data.message_error)
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
    const closeAlert = () => {
        setConfirm(false)
    };
    const columns = [];
    if (orders && orders.length !== 0) {
        Object.keys(orders[0]).forEach((key) => {
            if (key === 'order_status' || key === 'id' || key === 'userId' || key === 'order_status' || key === 'productId' || key === 'quantity' || key === 'createdAt' || key === 'updatedAt') {
                const column = {
                    key: key,
                    title: key,
                    dataIndex: key,
                    width: '12%',
                    editable: true,
                    // render: (text) => {
                    //     text
                    // },
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
                inputType: col.dataIndex === 'category' ? 'select' : 'text',
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
                    dataSource={orders}
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