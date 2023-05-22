import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from "./MessageBox";

export default function GetOneProduct() {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [imageSrc, setImageSrc] = useState("");
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
        setId(data.product.id);
        setImageSrc(`http://localhost:5000/${data.product.image}`);
      }
    } catch (error) {
      console.error("Error:", error);
    };
  };

  const handleCancel = () => {
    setShowModalMessage(false);
  };  

  return (
    <div className="get-user">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} style={{width: '250px'}} placeholder="Enter product name or ID"/>
      <br/><br/>
      <button className="add-button" onClick={handleGetOneProduct} disabled={!token}>
        Get product
      </button>
      <br />
      <div className="showimage">
      <table>
        <tbody>
          {product.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img src={imageSrc} alt={product.name} width={600}/>    
      </div>
      <DeleteProduct productId={id}/>
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
    </div>
  );
}
