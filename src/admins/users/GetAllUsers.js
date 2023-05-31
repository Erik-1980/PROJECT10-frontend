import { Table, Button } from 'antd';
import { useState } from 'react';
import { verificationToken } from '../../verificationToken/VerificationToken';
import { useSelector } from 'react-redux';
import { ErrorAlert } from '../../general/alert/AlertComponent';
import styles from './GetAllUsers.module.css';

const GetAllUsers = () => {
    const [users, setUsers] = useState();
    const [error, setError] = useState('');

    const token = useSelector((state) => state.auth.token);
    const columns = [];
    if (users) {
        Object.keys(users[0]).forEach((key) => {
            const column = {
                title: key,
                width: 150,
                dataIndex: key,
                key: key
            };
            if (key === 'firstname' || key === 'lastname' || key === 'id') {
                column.fixed = 'left';
            }
            columns.push(column);
        });
    };

    const data = users?.map((user) => {
        return { ...user, key: user.id };
    });
    const handleGetUsers = async () => {
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
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className={styles.main}>
            {error &&
                <ErrorAlert
                    message={error}
                />
            }
            <Button onClick={handleGetUsers} disabled={!token}>Get All Users</Button>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 1500,
                }}
                summary={() => (
                    <Table.Summary>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky
            />
        </div>
    );
};
export default GetAllUsers;