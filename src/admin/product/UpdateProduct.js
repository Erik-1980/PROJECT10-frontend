import { useState } from "react";
import CategoryList from "./CategoryList";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from "./MessageBox";


export default function UpdateProduct() {
   
    const [product, setProduct] = useState([]);
    const [value, setValue] = useState("");
    const [id, setId] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

  const handleGetOneProduct = async () => {
    const url = `http://localhost:5000/product/onlyoneproduct`;
    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: JSON.stringify({ value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.message) {
        setShowModalMessage(true)
        setMessage(data.message);
      } else {
        const product_info = Object.entries(data.product);
        setProduct(product_info);
        const id = data.product.id;
        setId(id);
        setBrand(product_info.find(([key]) => key === "brand")[1]);
        setName(product_info.find(([key]) => key === "name")[1]);
        setModel(product_info.find(([key]) => key === "model")[1]);
        setPrice(product_info.find(([key]) => key === "price")[1]);
        setQuantity(product_info.find(([key]) => key === "quantity")[1]);
        setImage(product_info.find(([key]) => key === "image")[1]);
        setDescription(product_info.find(([key]) => key === "description")[1]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    if(!value){
      setShowModalMessage(true)
      setMessage("Please select the product you would like to upgrade");
      return;
    }
    if (!brand || !name ||!model || !price || !quantity || !image) {
      setShowModalMessage(true)
      setMessage("Please fill in all fields");
      return;
    };
    if (!categoryId) {
      setShowModalMessage(true)
      setMessage("Please select a category");
      return;
    }
    const url = `http://localhost:5000/product/update`;
    try {
      const response = await fetchWithAuth(url, {
        method: "PUT",
        body: JSON.stringify({ id, brand, name, model, price, quantity, image, description, categoryId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        setShowModalMessage(true);
        setMessage(data.error);
      } else {
        setShowModalMessage(true)
        setMessage(data.message);
        setBrand("");
        setName("");
        setModel("");
        setPrice("");
        setQuantity("");
        setImage("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setShowModalMessage(false);
  };

  return (
    <div className="get-user">
      <input style={{width: '250px'}}
      type="text" 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="Enter product name or ID"/>
      <button className="add-button" onClick={handleGetOneProduct} disabled={!token}>
        Get Product
      </button>
      <br />
      <table>
        <thead>
            <tr>
             <th>Name</th>
             <th>Old Value</th>
             <th>New Value</th>
            </tr>
        </thead>
        <tbody>
  {product.filter(([key]) => {
      return (
        key !== "id" &&
        key !== "categoryId" &&
        key !== "createdAt" &&
        key !== "updatedAt"
      );
    })
    .map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value || "N/A"}</td>
        <td>
          {key === "category.name" ? (
            <CategoryList onSelectCategory={setCategoryId} />
          ) : (
            <input
              type="text"
              name={key}
              value={
                    key === "brand" 
                  ? brand
                  : key === "name" 
                  ? name
                  : key === "model"
                  ? model
                  : key === "price"
                  ? price
                  : key === "quantity"
                  ? quantity
                  : key === "image"
                  ? image
                  : key === "description"
                  ? description
                  : ""
              }
              onChange={(e) => {
                if (key === "brand") {
                  setBrand(e.target.value);
                }  else if (key === "name") {
                  setName(e.target.value);
                } else if (key === "model") {
                  setModel(e.target.value);
                } else if (key === "price") {
                  setPrice(e.target.value);
                } else if (key === "quantity") {
                  setQuantity(e.target.value);
                } else if (key === "image") {
                  setImage(e.target.value);
                } else if (key === "description") {
                  setDescription(e.target.value);
                }
              }}
            />
          )}
        </td>
      </tr>
    ))}
</tbody>

      </table>
      <br/><br/>
      <button className="add-button" type="submit" onClick={handleUpdateProduct} disabled={!token}>
          Update Product
        </button>
        {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
    </div>
  );
}
