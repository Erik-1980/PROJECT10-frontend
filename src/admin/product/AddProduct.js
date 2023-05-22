import { useState } from "react";
import CategoryList from "./CategoryList";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from "./MessageBox";

export default function AddProducts() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleAddProducts = async (event) => {
    event.preventDefault();

    if (!categoryId) {
      setMessage("Please select a category");
      setShowModalMessage(true);
      return
    }

    const url = `http://localhost:5000/product`;
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('name', name);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('categoryId', categoryId);

    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
        setShowModalMessage(true);
      } else {
        setMessage(data.message);
        setShowModalMessage(true);
        setBrand("");
        setName("");
        setModel("");
        setPrice("");
        setQuantity("");
        setImage(null);
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCancel = () => {
    setShowModalMessage(false);
  };

  return (
    <div className="get-user">
      <label htmlFor="category">Category:<span style={{ color: '#fe0101' }}>*</span></label>
      <CategoryList onSelectCategory={setCategoryId} />
      <form onSubmit={handleAddProducts} className="form">
        <label htmlFor="brand">Brand:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="text"
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          placeholder="Enter product brand"
          required
        />

        <label htmlFor="name">Name:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter product name"
          required
        />

        <label htmlFor="model">Model:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="text"
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          placeholder="Enter product model"
          required
        />

        <label htmlFor="price">Price:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Enter product price"
          required
        />

        <label htmlFor="quantity">Quantity:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="text"
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Enter product quantity"
          required
        />

        <label htmlFor="image">Image:<span style={{ color: '#fe0101' }}>*</span></label>
        <input style={{ width: '250px' }}
          type="file"
          id="image"
          onChange={handleImageChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter product description"
        >
        </textarea>
        <br /><br />
        <button className="add-button" type="submit" disabled={!token}>
          Add Product
        </button>
      </form>
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
    </div>
  );
}
