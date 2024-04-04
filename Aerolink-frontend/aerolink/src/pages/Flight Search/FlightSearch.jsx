import React, { useState } from 'react';
import './FlightSearch.css'; // Make sure to create a corresponding CSS file for styling

const FlightSearch = () => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic to search flights based on searchParams
    console.log('Searching flights with params:', searchParams);
    // After search logic, you might set a state that holds the search results and display them below
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
    </div>
  );
};

export default FlightSearch;
