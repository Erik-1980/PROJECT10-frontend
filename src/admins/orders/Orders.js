import { Form, Table, Typography, Input, Select } from 'antd';
import { EditOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Orders.module.css';
import { verificationToken } from '../../verificationToken/VerificationToken';
import { SuccessAlert, ErrorAlert, InfoAlert } from '../../general/alert/AlertComponent';

const { Option } = Select;

const Orders = () => {
    const product = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.categories);
    const token = useSelector((state) => state.auth.token);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [users, setUsers] = useState();
    const [orders, setOrders] = useState();
    const [saveTrigger, setSaveTrigger] = useState(false);

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

    useEffect(() => {
        const fetchOrders = async () => {
            const url = `http://localhost:5000/order/allorders`;
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
                    const allOrders = data.orders;
                    setOrders(allOrders);
                };
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchOrders();
    }, [token, saveTrigger]);

    const updatedOrders = orders?.map((order) => {
        const matchingProduct = product?.find((product) => {
            return product.id === order.productId;
        });
        if (matchingProduct) {
            const us = users?.find((user) => (order.userId === user.id))
            return {
                ...order,
                key: matchingProduct.id,
                'product name': matchingProduct.name + ' ' + matchingProduct.model,
                category: categories?.find((categ) => (matchingProduct.categoryId === categ.id)).name,
                'user name': us?.email,
                'delivery address': us?.country + ' ' + us?.city + ' ' + us?.address + ' ' + us?.phone
            };
        } else {
            return order;
        };
    });

    const orderStatus = ['Order is processed', 'Sent', 'In transit', 'Delivered'];

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
        const inputNode = inputType === 'select' ? <Select value={record.order_status} >{orderStatus?.map((values, index) => (<Option key={index} value={values}>{values}</Option>))}</Select> : <Input disabled autoComplete="off" />
        
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
            const id = editingKey;
            const newOrderStatus = row.order_status;
            const url = 'http://localhost:5000/order/updateorderstatus';
            try {
                const response = await verificationToken(url, {
                    method: "PUT",
                    body: JSON.stringify({ id, newOrderStatus}),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });
                const data = await response.json();
                if (data.message) {
                    setMessage(data.message);
                    setEditingKey('');
                    setSaveTrigger(prevTrigger => !prevTrigger);
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
    if (updatedOrders && updatedOrders.length !== 0) {
        Object.keys(updatedOrders[0]).forEach((key) => {
            if (key === 'order_status' || key === 'id' || key === 'order_status' || key === 'product name' || key === 'quantity' || key === 'user name' || key === 'category' || key === 'delivery address' || key === 'createdAt' || key === 'updatedAt') {
                const column = {
                    key: key,
                    title: key,
                    dataIndex: key,
                    width: key === 'id' || key === 'quantity' ? '4%' : '10%',
                    editable: true
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
                inputType: col.dataIndex === 'order_status' ? 'select' : 'text',
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
                    dataSource={updatedOrders}
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
export default Orders;