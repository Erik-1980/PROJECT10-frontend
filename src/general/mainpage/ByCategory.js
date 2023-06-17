import MainSceleton from './skeleton/MainSceleton';
import ShowCategory from './category/ShowCategory';

const ByCategory = () => {

    return (
        <div>
            <MainSceleton content={
                <ShowCategory />} />
        </div>
    );
};
export default ByCategory;