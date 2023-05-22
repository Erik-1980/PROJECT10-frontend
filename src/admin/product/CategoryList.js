import { useState, useEffect } from "react";
import { fetchWithAuth } from '../../general/RefreshToken';

export default function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

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
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchCategories();
  }, [token]);

  const handleSelectCategory = (event) => {
    onSelectCategory(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="get-user">
      <select onChange={handleSelectCategory}>
        <option value="">-- Select a category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
