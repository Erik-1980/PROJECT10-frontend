import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './general/mainpage/Main';
import Register from './general/register/Register';
import AboutUs from './general/aboutUs/AboutUs';
import Banks from './general/banks/Banks';
import Delivery from './general/delivery&payments/Delivery&Payments';
import AdminRoute from './admins/AdminRoute';
import fetchCategories from './admins/categories/getcategories/GetCategories';
import fetchProducts from './admins/products/getproducts/GetProducts';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  fetchCategories(dispatch);
  fetchProducts(dispatch);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/banks' element={<Banks />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/admin/*' element={<AdminRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;