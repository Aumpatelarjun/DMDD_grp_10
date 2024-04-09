import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Details:', loginDetails);
    const userData = await login(loginDetails.username, loginDetails.password);
    console.log(userData);
    if (userData) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginDetails.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
