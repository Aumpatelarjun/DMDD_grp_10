// Homepage.js
import React from 'react';
import './Homepage.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>AeroLink</span></h1>
          <p>Your ultimate destination for hassle-free flight management</p>
         <Link to={`/explore`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className="btn">Explore Flights</button>
         </Link>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Easy Booking</h2>
          <p>Book your flights seamlessly with our user-friendly interface</p>
        </div>
        <div className="feature">
          <h2>Flight Tracking</h2>
          <p>Stay updated with real-time flight tracking and notifications</p>
        </div>
        <div className="feature">
          <h2>Personalized</h2>
          <p>Receive personalized recommendations and offers</p>
        </div>
      </div>
      <section className="testimonials">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonial">
            <p>"AeroLink made my travel experience so much better. Highly recommended!"</p>
            <cite>- John Doe</cite>
          </div>
          <div className="testimonial">
            <p>"I love using AeroLink for booking flights. It's fast, easy, and reliable."</p>
            <cite>- Jane Smith</cite>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <p>&copy; 2024 AeroLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
