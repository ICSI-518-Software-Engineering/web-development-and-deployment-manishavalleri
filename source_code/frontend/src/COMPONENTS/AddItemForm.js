import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddItemForm.css';
import { Navigate } from 'react-router-dom';

const AddItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name and quantity are filled
    if (!name || !quantity || !image)  {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('quantity', quantity);

      await axios.post('http://localhost:3002/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageURL = `http://localhost:3002/uploads/${image.name}`;
      const response = await axios.post('http://localhost:3002/api/inventory', { name, quantity, imageURL });
      onAdd(response.data);
      setName('');
      setQuantity('');
      setImage(null);
      toast.success('Item added successfully');
    } catch (error) {
      console.error('Error adding inventory item:', error);
      toast.success('Item Added Successfully');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Inventory Item</h2>
      <div className="form">
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button onClick={handleSubmit}>Add Item</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddItemForm;
