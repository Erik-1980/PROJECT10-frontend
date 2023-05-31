import CreateCategories from '../categories/createcategories/CreateCategories';
import CreateProducts from '../products/craeteproduct/CreateProducts';

export default function CreateCategoryProduct() {
    return (
        <div style={{ display: 'flex', maxWidth: '1500px', margin: '0 auto'}}>
            <CreateProducts />
            <CreateCategories />
        </div>
    )
}