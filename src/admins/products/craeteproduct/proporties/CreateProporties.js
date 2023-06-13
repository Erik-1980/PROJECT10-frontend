import { Alert, Button, Space, Form, Input } from 'antd';
import styles from './ShowProporties.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setProporty } from '../../../../redux/slices/proportySlice';
import { ErrorAlert } from '../../../../general/alert/AlertComponent';

export const CreateProporties = ({ categoryId, onConfirm, onCancel }) => {
    const categories = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();
    const category = categories?.find(obj => obj.id === categoryId)?.name;

    const onFinish = async (values) => {
        dispatch(setProporty(values));
        onConfirm();
    }

    const renderCategoryProporties = (category) => {
        switch (category) {
            case 'SMARTPHONES':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="proporty"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Screen size'
                                            label='Screen size' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Main camera'
                                            label='Main camera' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Front camera'
                                            label='Front camera' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='SIM Card quantity'
                                            label='SIM Card quantity' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'TV':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="TV"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Smart TV'
                                            label='Smart TV' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen Diagonal'
                                            label='Screen Diagonal' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Native Display Resolution'
                                            label='Native Display Resolution' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Audio Output Power'
                                            label='Audio Output Power' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'LAPTOPS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="LAPTOPS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Screen size'
                                            label='Screen size' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen resolution'
                                            label='Screen resolution' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Hard Drive Capacity'
                                            label='Hard Drive Capacity' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Graphic card'
                                            label='Graphic card' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Touch screen'
                                            label='Touch screen' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'GAMING CONSOLS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="GAMING CONSOLS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='from'
                                            label='from' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'WASHING MACHINE':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="WASHING MACHINE"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Washing capacity (kg)'
                                            label='Washing capacity (kg)' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Spin speed (rpm)'
                                            label='Spin speed (rpm)' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Number of programs'
                                            label='Number of programs' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Wash class'
                                            label='Wash class' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Energy class'
                                            label='Energy class' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Water consumption (sheet/cycle)'
                                            label='Water consumption (sheet/cycle)' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Buck'
                                            label='Buck' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Dimensions (HxWxD) cm'
                                            label='Dimensions (HxWxD) cm' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'MONITORS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="MONITORS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Screen Diagonal'
                                            label='Screen Diagonal' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Native Display Resolution'
                                            label='Native Display Resolution' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen Type'
                                            label='Screen Type' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Frame frequency'
                                            label='Frame frequency' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Response time'
                                            label='Response time' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Brightness'
                                            label='Brightness' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Connectivity'
                                            label='Connectivity' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'TABLETS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="TABLETS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Screen size'
                                            label='Screen size' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Main camera'
                                            label='Main camera' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Front camera'
                                            label='Front camera' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'WATCHES':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="WATCHES"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Screen size'
                                            label='Screen size' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen resolution'
                                            label='Screen resolution' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            case 'SCOOTERS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="SCOOTERS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Power reserve'
                                            label='Power reserve' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
                case 'PHOTO CAMERAS':
                return (
                    <div>
                        <Alert className={styles.alert}
                            type="info"
                            action={
                                <Space direction="vertical">
                                    <Form
                                        name="PHOTO CAMERAS"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name='Matrix Size'
                                            label='Matrix Size' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Matrix Type'
                                            label='Matrix Type' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Matrix Resolution'
                                            label='Matrix Resolution' >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory Card Type'
                                            label='Memory Card Type' >
                                            <Input />
                                        </Form.Item>
                                        <Button size="small" type="primary" htmlType="submit" className={styles.accept}>
                                            Save
                                        </Button>
                                        <Button size="small" danger type="ghost" onClick={onCancel} className={styles.decline}>
                                            Decline
                                        </Button>
                                    </Form>
                                </Space>
                            }
                        />
                    </div>
                );
            default:
                return (
                    <>
                        <ErrorAlert
                            message={'Please select a category'}
                        />

                    </>
                )
        }
    };
    return (
        <>
            {renderCategoryProporties(category)}
        </>
    );
};