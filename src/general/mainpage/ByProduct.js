import MainSceleton from './skeleton/MainSceleton';
import ShowProduct from '../product/ShowProduct';

const ByCategory = () => {

    return (
        <div>
            <MainSceleton content={
                <ShowProduct />} />
        </div>
    );
};
export default ByCategory;