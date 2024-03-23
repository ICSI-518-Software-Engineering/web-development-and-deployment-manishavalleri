import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import InventoryList from './InventoryList';
import './InventoryPage.css'; // Import CSS file for styling
import { ToastContainer } from 'react-toastify';

const InventoryPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="inventory-page-container">
      <h1 className="page-title">Inventory Management</h1>
      <div className="buttons">
        <button className="add-button" onClick={() => setShowAddForm(true)}>Add Inventory</button>
        <button className="view-button" onClick={() => setShowAddForm(false)}>View All Inventory</button>
      </div>
      <div className="content">
        {showAddForm ? <AddItemForm /> : <InventoryList />}
        <ToastContainer />
      </div>
    </div>
  );
};

export default InventoryPage;
