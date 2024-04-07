import React, { useState } from 'react';
import '../../App.css'; 
import { login } from '../../services';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Details:', loginDetails);
    const userData = await login(loginDetails.username, loginDetails.password);
    console.log(userData);
    
    // Assuming userData contains information about successful login
    if (userData) {
      // Redirect to homepage
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
        <button type="submit" className="form-button login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
