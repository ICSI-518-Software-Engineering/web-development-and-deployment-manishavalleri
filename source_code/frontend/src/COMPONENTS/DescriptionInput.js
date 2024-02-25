import React, { useState } from 'react';

const DescriptionInput = () => {
  const [description, setDescription] = useState('');

  return (
    <div className="container">
      <h2 className="mt-4">Edit Description</h2>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionInput;
