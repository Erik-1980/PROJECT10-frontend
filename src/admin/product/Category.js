import { useState, useEffect } from "react";
import { fetchWithAuth } from '../../general/RefreshToken';
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onCategory, setOnCategory] = useState(false)

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCategories() {
      const url = "http://localhost:5000/product/category";
      try {
        const response = await fetchWithAuth(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setCategories(data.categories);
        setOnCategory(false)
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchCategories();
  }, [token, onCategory]);

  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
const handleUpdateCategory = () => {
  setOnCategory(true);
};

  return (
    <div className="get-user">
      <select value={selectedCategory} onChange={handleSelectCategory}>
        <option value="">-- Select a category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <br/><br/>
      <DeleteCategory id={selectedCategory} onCategoryDelete={handleUpdateCategory}/>
      <br/><br/>
      <AddCategory onCategoryAdd={handleUpdateCategory}/>
    </div>
  );
}

