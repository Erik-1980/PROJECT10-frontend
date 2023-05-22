import { List } from 'antd';
import styles from './FeedbackList.module.css'

const FeedbackList = () => {
    const reviewsData = [
        { id: 1, text: 'Отзыв 1' },
        { id: 2, text: 'Отзыв 2' },
        { id: 3, text: 'Отзыв 3' },
        { id: 4, text: 'Отзыв 4' }
    ];
    return(
        <List className={styles.list}
                dataSource={reviewsData}
                renderItem={(item) => <List.Item>{item.text}</List.Item>}
            />
    )
};

export default FeedbackList