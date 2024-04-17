import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UpdateItemForm = ({ id, name: initialName, quantity: initialQuantity, onUpdate }) => {
  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success('Item updated successfully');
      
      setTimeout(async () => {
        const response = await axios.put(`http://3.86.66.126:3002/api/inventory/${id}`, { name, quantity });
        console.log('Item updated successfully');
        onUpdate(response.data);
        setTimeout(() => {
          window.location.reload(); 
        }, 3000);
      }, 3000);
  } catch (error) {
        console.error('Error updating inventory item:', error);
      }
    };
  

  return (
    <div className='page'>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Update Item</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateItemForm;
