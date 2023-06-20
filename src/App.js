import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './general/mainpage/Main';
import Register from './general/register/Register';
import AboutUs from './general/aboutUs/AboutUs';
import Banks from './general/banks/Banks';
import Delivery from './general/delivery&payments/Delivery&Payments';
import AdminRoute from './admins/AdminRoute';
import Cart from './user/cart/Cart';
import Order from './user/order/Order';
import ShowProduct from './general/product/ShowProduct';
import ShowCategory from './general/mainpage/category/ShowCategory';
import fetchCategories from './admins/categories/getcategories/GetCategories';
import fetchProducts from './admins/products/getproducts/GetProducts';
import fetchCart from './user/cart/getcart/GetCart';
import fetchOrder from './user/order/getorder/GetOrder';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import MainSceleton from './general/mainpage/skeleton/MainSceleton';
import Payment from './stripe/Payment';
import Completion from "./stripe/Complation";

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
    fetchOrder(dispatch);
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
          <Route path='/cart' element={<MainSceleton content={<Cart />} />} />
          <Route path='/orders' element={<MainSceleton content={<Order />} />} />
          <Route path='/showproduct/:id' element={<MainSceleton content={<ShowProduct />} />} />
          <Route path='/showcategory/:id' element={<MainSceleton content={<ShowCategory />} />} />
          <Route path='/admin/*' element={<AdminRoute />} />
          <Route path="/payment" element={<MainSceleton content={<Payment />} />} />
          <Route path="/completion" element={<MainSceleton content={<Completion />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;