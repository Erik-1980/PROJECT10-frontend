import { setCategory } from '../../../redux/slices/categorySlice';

const fetchCategories = async (dispatch) => {
  const url = "http://localhost:5000/product/category";
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      dispatch(setCategory(data.categories));
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default fetchCategories;
