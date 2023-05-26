import { useDispatch } from 'react-redux';
import { setProduct } from '../../../redux/slices/productSlice';

const GetProducts = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const url = "http://localhost:5000/product/products";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        dispatch(setProduct(data.products));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    fetchProducts();
};

export default GetProducts;
