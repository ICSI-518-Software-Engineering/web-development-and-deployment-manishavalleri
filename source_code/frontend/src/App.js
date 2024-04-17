import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NameInput from '../src/COMPONENTS/NameInput';
import Addition from '../src/COMPONENTS/Addition';
import Navbar from '../src/COMPONENTS/navbar';
import Card from './COMPONENTS/card';
import InventoryPage from './COMPONENTS/Inventory';
import SignUp from './COMPONENTS/SignUp';
import Login from './COMPONENTS/Login';
import UserInfo from './COMPONENTS/userInfo';
import Home from './COMPONENTS/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
            
          <Route path="/" element={<Home />} />
        
          <Route path="/addition" element={<Addition />} />
          <Route path="/profile" element={<NameInput />} />
          <Route path="/third-party" element={<Card />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserInfo />} />
          
          
          
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
