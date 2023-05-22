
export const getCategories = async () => {
      const url = "http://localhost:5000/product/category";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('categories', data.categories)
        };
      } catch (error) {
        console.error("Error:", error);
      };
    };