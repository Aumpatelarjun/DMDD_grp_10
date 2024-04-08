import React, { useState, useEffect } from 'react';
import FlightCard from '../FlightCard/FlightCard.jsx';
import "./FlightExplorePage.css";
import { filterFlights, getAllFlights } from '../../services';

function FlightExplorePage() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filters, setFilters] = useState({
    Arrival_Airport_Code: '',
    Departure_Airport_Code: '',
    Airline_ID: '',
    Departure_time: '',
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const data = await getAllFlights();
      setFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const applyFilters = async () => {
    const flight = await filterFlights({
      "arrivalCode" : filters.Arrival_Airport_Code, 
      "departureCode" : filters.Departure_Airport_Code,
      "airlineID": filters.Airline_ID,
      "departureTime":filters.Departure_time
    })
    setFilteredFlights(flight);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flight-explore-container">
      <h1>Explore Flights</h1>
      <input
        type="text"
        name="Departure_Airport_Code"
        value={filters.Departure_Airport_Code}
        onChange={handleFilterChange}
        placeholder="Origin"
        className="filter-input"
      />
      <input
        type="text"
        name="Arrival_Airport_Code"
        value={filters.Arrival_Airport_Code}
        onChange={handleFilterChange}
        placeholder="Destination"
        className="filter-input"
      />
      <input
        type="text"
        name="Airline_ID"
        value={filters.Airline_ID}
        onChange={handleFilterChange}
        placeholder="Airline"
        className="filter-input"
      />
      <input
        type="text"
        name="Departure_time"
        value={filters.Departure_time}
        onChange={handleFilterChange}
        placeholder="Departure Time"
        className="filter-input"
      />
      <button onClick={applyFilters} className="filter-button">Apply Filters</button>
      {filteredFlights.map(flight => (
        <FlightCard key={flight.Flight_ID} flight={flight} />
      ))}
    </div>
  );
}

export default FlightExplorePage;
