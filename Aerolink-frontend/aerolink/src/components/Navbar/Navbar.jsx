import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Update isLoggedIn state when localStorage changes
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    // Update username from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.data && userData.data.length > 0) {
      setUsername(userData.data[0].Username);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className="navbar-logo">
          AeroLink
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/')}>
              Home
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/explore')}>
              Explore
            </span>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="nav-links">
                  Welcome, {username}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-links" onClick={handleLogout}>
                  Logout
                </span>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
