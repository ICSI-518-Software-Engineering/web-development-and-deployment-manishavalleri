import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NameInput from '../src/COMPONENTS/NameInput';
import Addition from '../src/COMPONENTS/Addition';
import Navbar from '../src/COMPONENTS/navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
            
          <Route path="/" element={<NameInput />} />
        
          <Route path="/addition" element={<Addition />} />
          <Route path="/profile" element={<NameInput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
