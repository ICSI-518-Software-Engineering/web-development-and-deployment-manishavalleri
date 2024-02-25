import React, { useState } from 'react';
import axios from 'axios';

const Addition = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [frontendResult, setFrontendResult] = useState('');
  const [backendResult, setBackendResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddition = async () => {
    setLoading(true);
    const result = parseInt(num1) + parseInt(num2);
    setFrontendResult(result);

    try {
      const response = await axios.post('http://ec2-3-22-83-104.us-east-2.compute.amazonaws.com:6000/add', { num1, num2 });
      setBackendResult(response.data.result);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Number Addition</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <input type="number" className="form-control" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Enter first number" />
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Enter second number" />
          </div>
          <button className="btn btn-primary" onClick={handleAddition} disabled={loading}>
            {loading ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <p><strong> Addition Result from(ReactJs) is:</strong> {frontendResult}</p>
          <p><strong> Addition Result from(Server) is:</strong> {backendResult}</p>
        </div>
      </div>
    </div>
  );
};

export default Addition;
