import React, { useState, useEffect } from 'react';

const NameInput = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedDescription = localStorage.getItem('description');
    if (storedName) setName(storedName);
    if (storedDescription) setDescription(storedDescription);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdate = () => {
    setUpdatedName(name);
    setUpdatedDescription(description);
    localStorage.setItem('name', name);
    localStorage.setItem('description', description);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, 300, 300);
        setImage(canvas.toDataURL('image/jpeg'));
      };
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Edit Profile</h2>
      <div className="row align-items-start">
        <div className="col-md-4 pb-0"> {/* Remove bottom padding */}
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="img-fluid mb-2"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('fileInput').click()}
            />
          ) : (
            <label htmlFor="fileInput">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Profile Placeholder"
                className="img-fluid mb-2"
                style={{ cursor: 'pointer' }}
              />
            </label>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <div className="col-md-8 pt-0"> {/* Remove top padding */}
          <div className="row">
            <div className="col-md-12 mb-2">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="col-md-12 mb-2">
              <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter your description"
                rows="4"
              ></textarea>
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-8">
          <h4>Updated Profile</h4>
          <p><strong>Name:</strong> {updatedName}</p>
          <p><strong>Description:</strong> {updatedDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default NameInput;









