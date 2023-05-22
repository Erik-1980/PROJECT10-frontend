import CreateCategories from '../categories/createcategories/CreateCategories';
import CreateProducts from '../products/craeteproduct/CreateProducts';

export default function CreateCategoryProduct() {
    return (
        <div style={{ display: 'flex'}}>
            <CreateProducts />
            <CreateCategories />
        </div>
    )
}