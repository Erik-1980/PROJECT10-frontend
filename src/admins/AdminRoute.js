import { Routes, Route } from 'react-router-dom';
import Header from './header/HeaderAdmin'
// import GetUser from './user/GetUser';
import GetAllUsers from './users/GetAllUsers';
import CreateCategoryProduct from './createcategory&product/CreateCategoryProduct';
// import GetAllProducts from './product/GetAllProducts';
// import GetOneProduct from './product/GetOneProduct';
// import UpdateProduct from './product/UpdateProduct';
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
                {/* <Route path='/getuser' element={<GetUser />} /> */}
                <Route path='/users' element={<GetAllUsers />} />
                <Route path='/create' element={<CreateCategoryProduct />} />
                {/* <Route path='/getallproducts' element={<GetAllProducts />} /> */}
                {/* <Route path='/getoneproduct' element={<GetOneProduct />} /> */}
                {/* <Route path='/updateproduct' element={<UpdateProduct />} /> */}
            </Routes>
        </div>
    );
}
