import { useState } from 'react';
import { fetchWithAuth } from '../../general/RefreshToken';
import ModalConfirm from './ModalConfirm';
import MessageBox from "./MessageBox";

export default function DeleteCategory ({id, onCategoryDelete}){
   
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token')

  const handleDeleteCategory = async () => {
      const url = `http://localhost:5000/product/category/${id}`;
      try {
        const response = await fetchWithAuth(url, {
          method: "DELETE",
          headers: {
            Authorization: token,
          }
        });
        const data = await response.json();
        onCategoryDelete();
        setShowModalMessage(true);
        setMessage(data.message);
        } catch (error) {
        console.error("Error:", error);
      }
    };

      const handleConfirmDelete = () => {
        setShowModalConfirm(false);
        handleDeleteCategory();
      };
    
      const handleCancelDelete = () => {
        setShowModalConfirm(false);
      };

      const handleCancel = () => {
        setShowModalMessage(false);
      };

    return(
     <div>
      <button className="add-button" onClick={() => setShowModalConfirm(true)} disabled={!token}>Delete category</button>
      {showModalConfirm &&
        <ModalConfirm
          message={'When deleting a category, you will also delete all products associated with that category'}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      }
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
    </div>
    )
}