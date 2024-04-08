// AirportManage.jsx
import React, { useState, useEffect } from 'react';
import './AirportManage.css';

function AirportManage() {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    airportCode: '',
    airportName: '',
    airportLocation: '',
    timezone: ''
  });

  const [airportNames] = useState({
    JFK: 'John F. Kennedy International Airport',
    LAX: 'Los Angeles International Airport',
    ATL: 'Hartsfield-Jackson Atlanta International Airport',
    ORD: 'O\'Hare International Airport',
    DFW: 'Dallas/Fort Worth International Airport',
    DEN: 'Denver International Airport',
    SFO: 'San Francisco International Airport',
    SEA: 'Seattle-Tacoma International Airport'
  });

  const [selectedAirportCode, setSelectedAirportCode] = useState('');


  const timezoneOptions = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', // American timezones
    'UTC-07:00', 'UTC-06:00', 'UTC-05:00', // European timezones
    'UTC+05:30', 'UTC+06:00', 'UTC+07:00', // Asian timezones
  ];

  const airportCodes = ['JFK', 'LAX', 'ATL', 'ORD', 'DFW', 'DEN', 'SFO', 'SEA']; // Example airport codes
  const [airportLocations, setAirportLocations] = useState({
    JFK: 'New York City',
    LAX: 'Los Angeles',
    ATL: 'Atlanta',
    ORD: 'Chicago',
    DFW: 'Dallas-Fort Worth',
    DEN: 'Denver',
    SFO: 'San Francisco',
    SEA: 'Seattle'
  });



  const handleInputChange = (e) => {
    setNewAirport({ ...newAirport, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newAirport)
  };



  return (
    <div className="airport-manage-container">
      <h1>Airports</h1>
      <form onSubmit={handleSubmit} className="manage-form">
        <select
          name="airportCode"
          value={newAirport.airportCode}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Airport Code</option>
          {airportCodes.map((code, index) => (
            <option key={index} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="airportName"
          value={airportNames[newAirport.airportCode] || ''}
          onChange={handleInputChange}
          placeholder="Airport Name"
          required
        />
        <input
          type="text"
          name="airportLocation"
          value={airportLocations[newAirport.airportCode] || ''}
          onChange={handleInputChange}
          placeholder="Location"
          readOnly
          required
        />
        <select
          name="timezone"
          value={newAirport.timezone}
          onChange={handleInputChange}
          readOnly
          required
        >
          <option value="">Select Timezone</option>
          {timezoneOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit" className="manage-button">Add Airport</button>
      </form>
      <ul className="airports-list">
        {airports.map((airport) => (
          <li key={airport.airportCode}>
            {airport.airportName} ({airport.airportCode}) - {airport.airportLocation}, {airport.timezone}
            <button className="manage-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AirportManage;