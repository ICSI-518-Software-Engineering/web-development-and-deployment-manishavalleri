import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BMedia Library
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Default Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                User Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addition">
                Addition
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/third-party">
                Third Party API
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventory">
                Inventory Management
              </Link>
            </li>
            {localStorage.getItem('token') ? (
              // If token is present, display logout link
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              // If token is not present, display sign up and sign in links
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign in
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
