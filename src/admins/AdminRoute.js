import { Routes, Route } from 'react-router-dom';
import Header from './header/HeaderAdmin';
import GetAllUsers from './users/GetAllUsers';
import CreateCategoryProduct from './createcategory&product/CreateCategoryProduct';
import UpdateCategories from './categories/updatecategories/UpdateCategories';
import UpdateProducts from './products/updateproduct/UpdateProducts';
import MainPageAdmin from './MainPageAdmin';
import { useSelector } from 'react-redux';
import { admins } from '../config/SetAdmin';
import jwt_decode from "jwt-decode";

export default function AdminRoute() {
    
    const token = useSelector((state) => state.auth.token);
    const getEmailFromToken = () => {
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.email;
        }
        return null;
    };
    const email = getEmailFromToken();
    const admin = admins.find((value) => {
        return value === email;
    });
    if (!admin) {
        window.location.href = "/";
    };

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<MainPageAdmin />} />
                <Route path='/users' element={<GetAllUsers />} />
                <Route path='/create' element={<CreateCategoryProduct />} />
                <Route path='/updatecategory' element={<UpdateCategories />} />
                <Route path='/updateproduct' element={<UpdateProducts />} />
            </Routes>
        </div>
    );
}
