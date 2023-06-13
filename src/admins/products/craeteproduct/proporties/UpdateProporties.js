import { Alert, Button, Space, Form, Input } from 'antd';
import styles from './ShowProporties.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setProporty } from '../../../../redux/slices/proportySlice';

export const UpdateProporties = ({ categoryId, id, onConfirm, onCancel }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.categories);
    const proporties = products?.find(obj => obj.id === id).proporties ? JSON.parse(products?.find(obj => obj.id === id).proporties) : '';
    const category = categories?.find(obj => obj.id === categoryId)?.name;
    const onFinish = async (values) => {
        dispatch(setProporty(values));
        onConfirm();
    };
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
                                            label='Screen size'
                                            initialValue={proporties['Screen size']} >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU'
                                            initialValue={proporties['CPU']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM'
                                            initialValue={proporties['RAM']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory'
                                            initialValue={proporties['Memory']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Main camera'
                                            label='Main camera'
                                            initialValue={proporties['Main camera']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Front camera'
                                            label='Front camera'
                                            initialValue={proporties['Front camera']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity'
                                            initialValue={proporties['Battery capacity']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='SIM Card quantity'
                                            label='SIM Card quantity'
                                            initialValue={proporties['SIM Card quantity']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System'
                                            initialValue={proporties['Operating System']}  >
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
                                            label='Smart TV'
                                            initialValue={proporties['Smart TV']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen Diagonal'
                                            label='Screen Diagonal'
                                            initialValue={proporties['Screen Diagonal']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Native Display Resolution'
                                            label='Native Display Resolution'
                                            initialValue={proporties['Native Display Resolution']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Audio Output Power'
                                            label='Audio Output Power'
                                            initialValue={proporties['Audio Output Power']}  >
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
                                            label='Screen size'
                                            initialValue={proporties['Screen size']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen resolution'
                                            label='Screen resolution'
                                            initialValue={proporties['Screen resolution']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU'
                                            initialValue={proporties['CPU']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM'
                                            initialValue={proporties['RAM']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Hard Drive Capacity'
                                            label='Hard Drive Capacity'
                                            initialValue={proporties['Hard Drive Capacity']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Graphic card'
                                            label='Graphic card'
                                            initialValue={proporties['Graphic card']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Touch screen'
                                            label='Touch screen'
                                            initialValue={proporties['Touch screen']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System'
                                            initialValue={proporties['Operating System']}  >
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
                                            label='from'
                                            initialValue={proporties['from']}  >
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
                                            label='Washing capacity (kg)'
                                            initialValue={proporties['Washing capacity (kg)']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Spin speed (rpm)'
                                            label='Spin speed (rpm)'
                                            initialValue={proporties['Spin speed (rpm)']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Number of programs'
                                            label='Number of programs'
                                            initialValue={proporties['Number of programs']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Wash class'
                                            label='Wash class'
                                            initialValue={proporties['Wash class']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Energy class'
                                            label='Energy class'
                                            initialValue={proporties['Energy class']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Water consumption (sheet/cycle)'
                                            label='Water consumption (sheet/cycle)'
                                            initialValue={proporties['Water consumption (sheet/cycle)']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Buck'
                                            label='Buck'
                                            initialValue={proporties['Buck']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Dimensions (HxWxD) cm'
                                            label='Dimensions (HxWxD) cm'
                                            initialValue={proporties['Dimensions (HxWxD) cm']}  >
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
                                            label='Screen Diagonal'
                                            initialValue={proporties['Screen Diagonal']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Native Display Resolution'
                                            label='Native Display Resolution'
                                            initialValue={proporties['Native Display Resolution']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen Type'
                                            label='Screen Type'
                                            initialValue={proporties['Screen Type']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Frame frequency'
                                            label='Frame frequency'
                                            initialValue={proporties['Frame frequency']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Response time'
                                            label='Response time'
                                            initialValue={proporties['Response time']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Brightness'
                                            label='Brightness'
                                            initialValue={proporties['Brightness']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Connectivity'
                                            label='Connectivity'
                                            initialValue={proporties['Connectivity']}  >
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
                                            label='Screen size'
                                            initialValue={proporties['Screen size']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='RAM'
                                            label='RAM'
                                            initialValue={proporties['RAM']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory'
                                            initialValue={proporties['Memory']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Main camera'
                                            label='Main camera'
                                            initialValue={proporties['Main camera']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Front camera'
                                            label='Front camera'
                                            initialValue={proporties['Front camera']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity'
                                            initialValue={proporties['Battery capacity']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System'
                                            initialValue={proporties['Operating System']}  >
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
                                            label='Screen size'
                                            initialValue={proporties['Screen size']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Screen resolution'
                                            label='Screen resolution'
                                            initialValue={proporties['Screen resolution']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='CPU'
                                            label='CPU'
                                            initialValue={proporties['CPU']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory'
                                            label='Memory'
                                            initialValue={proporties['Memory']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity'
                                            initialValue={proporties['Battery capacity']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Operating System'
                                            label='Operating System'
                                            initialValue={proporties['Operating System']}  >
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
                                            label='Power reserve'
                                            initialValue={proporties['Power reserve']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Battery capacity'
                                            label='Battery capacity'
                                            initialValue={proporties['Battery capacity']}  >
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
                                            label='Matrix Size'
                                            initialValue={proporties['Matrix Size']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Matrix Type'
                                            label='Matrix Type'
                                            initialValue={proporties['Matrix Type']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Matrix Resolution'
                                            label='Matrix Resolution'
                                            initialValue={proporties['Matrix Resolution']}  >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='Memory Card Type'
                                            label='Memory Card Type'
                                            initialValue={proporties['Memory Card Type']}  >
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
        }
    };
    return (
        <>
            {renderCategoryProporties(category)}
        </>
    );
};