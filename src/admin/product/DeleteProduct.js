import { useState } from 'react';
import { fetchWithAuth } from '../../general/RefreshToken';
import ModalConfirm from './ModalConfirm';
import MessageBox from "./MessageBox";

export default function DeleteProduct({ productId, onProductDelete }) {

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');

    const handleDeleteProduct = async () => {
    const url = `http://localhost:5000/product/${productId}`;
    try {
      const response = await fetchWithAuth(url, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      onProductDelete()
      setShowModalMessage(true)
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  const handleConfirmDelete = () => {
    setShowModalConfirm(false);
    handleDeleteProduct();
  };

  const handleCancelDelete = () => {
    setShowModalConfirm(false);
  };

  const handleCancel = () => {
    setShowModalMessage(false);
  };

  return (
    <>
        <button className="add-button" onClick={() => setShowModalConfirm(true)} disabled={!token}>Delete</button>
        {showModalConfirm &&
        <ModalConfirm
          message={'Are you sure you want to remove this product?'}
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
    </>
  );
}
