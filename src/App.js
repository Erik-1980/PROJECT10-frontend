import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './general/mainpage/Main';
import Register from './general/register/Register';
import AboutUs from './general/aboutUs/AboutUs';
import Banks from './general/banks/Banks';
import Delivery from './general/delivery&payments/Delivery&Payments';
import AdminRoute from './admins/AdminRoute';
import ByCart from './general/mainpage/ByCart';
import ByProduct from './general/mainpage/ByProduct';
import ByCategory from './general/mainpage/ByCategory';
import fetchCategories from './admins/categories/getcategories/GetCategories';
import fetchProducts from './admins/products/getproducts/GetProducts';
import fetchCart from './user/cart/getcart/GetCart';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  fetchCategories(dispatch);
  fetchProducts(dispatch);

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now();
    const timeUntilExpiration = decodedToken.exp * 1000 - currentTime;
    if (timeUntilExpiration < 0) {
      localStorage.clear()
    };
    fetchCart(dispatch);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/banks' element={<Banks />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/cart' element={<ByCart />} />
          <Route path='/showproduct/:id' element={<ByProduct />} />
          <Route path='/showcategory/:id' element={<ByCategory />} />
          <Route path='/admin/*' element={<AdminRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;