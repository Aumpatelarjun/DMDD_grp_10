import React, { useState } from 'react';
import './BookFlight.css';
import { bookFlight } from '../../services';

const BookFlight = () => {
  const [formData, setFormData] = useState({
    username: '',
    flightID: '',
    origin: '',
    destination: '',
    seat: '',
    insurance: '',
    paymentType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic to submit form data
    console.log(formData);
    console.log('Form submitted:', formData);
    const data = await bookFlight(formData);
  };

  return (
    <div className="book-flight-container">
      <h1>Book Flight</h1>
      <form onSubmit={handleSubmit} className="book-flight-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="flightID"
          value={formData.flightID}
          onChange={handleChange}
          placeholder="Flight ID"
          required
        />
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="Departure Airport Code"
          required
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Arrival Airport Code"
          required
        />
        <input
          type="text"
          name="seat"
          value={formData.seat}
          onChange={handleChange}
          placeholder="Seat No"
          required
        />
        <select
          name="insurance"
          value={formData.insurance}
          onChange={handleChange}
          required
        >
          <option value="">Select Travel Insurance</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select
          name="paymentType"
          value={formData.paymentType}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Type</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash</option>
        </select>
        <button type="submit" className="book-flight-button">Book Now</button>
      </form>
    </div>
  );
};

export default BookFlight;
