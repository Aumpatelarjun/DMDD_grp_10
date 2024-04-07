import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const logo = require("../../Aerolink-Logo.webp");

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img height={70} width={70} src={logo} alt="" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/')}>
              Home
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/services')}>
              Services
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/about')}>
              About
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => navigate('/login')}>
              Login
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
