import { useState } from "react";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from "./MessageBox";

export default function AddCategory({onCategoryAdd}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  
  const handleAddCategory = async (event) => {
    event.preventDefault();   
    const url = `http://localhost:5000/product/category`;
    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });
      const data = await response.json();
      if (data.error) {
        setShowModalMessage(true);
        setMessage(data.error)
      } else {
        onCategoryAdd();
        setShowModalMessage(true);
        setMessage(data.message)
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowModalMessage(false);
  };  

  return (
    <div>
      <form onSubmit={handleAddCategory}>
        <label htmlFor="name">Name:<span style={{color: '#fe0101'}}>*</span></label>
        <input style={{width: '250px'}}
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter category name"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter category description"
        ></textarea>
        <br/><br/>

        <button className="add-button" type="submit" disabled={!token}>
          Add category
        </button>
      </form>
      <br/>
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancelDelete}
        />
      }
    </div>
  );
}
