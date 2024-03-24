import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateItemForm from './UpdateItemForm';
import './InventoryList.css'; // Import CSS file for styling
import { ToastContainer, toast } from 'react-toastify';


const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('http://3.86.66.126:3002/api/inventory');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
        toast.error('Error fetching inventory items:', error);
        
      }
    };

    fetchInventoryItems();
  }, []);

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await axios.put(`http://ec2-3-84-142-237.compute-1.amazonaws.com:3002/api/inventory/${updatedItem._id}`, updatedItem);
      const updatedItems = inventoryItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      );
      setInventoryItems(updatedItems);
      setShowUpdateForm(null);
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error updating inventory item:', error);
      toast.error('Failed to update item');
    }
  };
  

  const handleDelete = async (id) => {
    try {
      toast.success('Item Deleted Successfully');
    
      await axios.delete(`http://ec2-3-84-142-237.compute-1.amazonaws.com:3002/api/inventory/${id}`);
      const filteredItems = inventoryItems.filter((item) => item._id !== id);
      setInventoryItems(filteredItems);
      console.log('Deleting item...');
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      
    }
  };
  
  return (
    <div className="inventory-list-container">
      
      <h2 className="inventory-list-title">Inventory Items</h2>
      {inventoryItems.length === 0 ? (
        <p className="no-items-message">No inventory items available</p>
      ) : (
        <ul className="inventory-list">
          {inventoryItems.map((item) => {
            console.log("image is " ,item.imageURL);
        
  return (
    <li key={item._id} className="inventory-item">
      <div className="item-info">
        <img src={item.imageURL} alt={item.name} className="item-image" />
        <div className="item-details">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-quantity">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="item-actions">
        <button className="update-button" onClick={() => setShowUpdateForm(item._id)}>Update</button>
        <div className="button-space"></div>
        <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
      </div>
      {showUpdateForm === item._id && (

        <UpdateItemForm
        id={item._id}
        name={item.name}
        quantity={item.quantity}
        onUpdate={handleUpdate}
        showToast={() => toast.success('Item updated successfully')} 
      />
      
      )}
      
    </li>
    
  );
})}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default InventoryList;
