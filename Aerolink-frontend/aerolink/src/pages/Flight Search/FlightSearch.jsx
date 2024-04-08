import React, { useState } from 'react';
import './FlightSearch.css'; // Make sure to create a corresponding CSS file for styling
const FlightSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    date: '',
    destination: '',
    departure: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMoreDetails = (flightId) => {
    window.location.href = `/flight-details/${flightId}`;
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // Logic to search flights based on searchParams
    console.log('Searching flights with params:', searchParams);
    const dummyFlight = {
      id: 1,
      origin: 'Boston',
      destination: 'Vadodara',
      departureTime: '10:00 AM',
      arrivalTime: '8:00 PM',
      price: '$500'
    };
    setSearchResults([dummyFlight]);
  };

  return (
    <div className="flight-search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input 
          type="date" 
          name="date" 
          value={searchParams.date} 
          onChange={handleInputChange} 
          placeholder="Date"
        />
        <input 
          type="text" 
          name="destination" 
          value={searchParams.destination} 
          onChange={handleInputChange} 
          placeholder="Destination"
        />
        <input 
          type="text" 
          name="departure" 
          value={searchParams.departure} 
          onChange={handleInputChange} 
          placeholder="Departure"
        />
        <button type="submit" className="search-button">Search Flights</button>
      </form>
      
      {/* The results component would be here, likely mapping over search results and displaying them */}
      <div className="flight-results">
        {searchResults.map(flight => (
          <div key={flight.id} className="flight-card">
            <h3>{flight.origin} to {flight.destination}</h3>
            <p>Departure Time: {flight.departureTime}</p>
            <p>Arrival Time: {flight.arrivalTime}</p>
            <p>Price: {flight.price}</p>
            <button 
              type="button" 
              className="detail-button" 
              onClick={() => handleMoreDetails(flight.id)}
            >
              More Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearch;
