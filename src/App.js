import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './general/mainpage/MainPage';
import Register from './general/register/Register';
import AboutUs from './general/aboutUs/AboutUs';
import Banks from './general/banks/Banks';
import Delivery from './general/delivery&payments/Delivery&Payments';
import AdminRoute from './admins/AdminRoute';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/banks' element={<Banks />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/admin/*' element = {<AdminRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
