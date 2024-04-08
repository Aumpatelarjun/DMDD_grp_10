import React, { useState } from 'react';
import './AddFlight.css'; // Import CSS file

const AddFlight = () => {
  const [flightDetails, setFlightDetails] = useState({
    arrivalAirportCode: '',
    departureAirportCode: '',
    ticketPrice: '',
    arrivalTime: '',
    departureTime: '',
    aircraftId: '',
    airlineId: '',
  });

  const airportCodes = ['JFK', 'LAX', 'ORD', 'DFW'];
  const aircraftIds = ['A123', 'B456', 'C789'];
  const airlineIds = ['AA', 'UA', 'DL'];

  const handleDropdownChange = (field, value) => {
    setFlightDetails({ ...flightDetails, [field]: value });
  };

  const handleChange = (e) => {
    console.log(e.target.name)
    const { name, value } = e.target;
    setFlightDetails({ ...flightDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in flightDetails) {
      if (flightDetails[key] === '') {
        alert(`${key} cannot be empty.`);
        return;
      }
    }
    if (isNaN(flightDetails.ticketPrice)) {
      alert('Ticket price must be a numeric value.');
      return;
    }
    if (flightDetails.arrivalAirportCode === flightDetails.departureAirportCode) {
      alert('Arrival and departure airport codes cannot be the same.');
      return; // Stop submission if codes are the same
    }
    console.log(flightDetails);
    setFlightDetails({
      arrivalAirportCode: '',
      departureAirportCode: '',
      ticketPrice: '',
      arrivalTime: '',
      departureTime: '',
      aircraftId: '',
      airlineId: '',
    });
  };

  return (
    <div className="add-flight-container">
      <h2>Add Flight</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <div className="form-group">
          <label>
            Arrival Airport Code:
            <select value={flightDetails.arrivalAirportCode} onChange={(e) => handleDropdownChange('arrivalAirportCode', e.target.value)} className="form-control">
              <option value="">Select Arrival Airport</option>
              {airportCodes.map((airportCode) => (
                <option key={airportCode} value={airportCode}>{airportCode}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Departure Airport Code:
            <select value={flightDetails.departureAirportCode} onChange={(e) => handleDropdownChange('departureAirportCode', e.target.value)} className="form-control">
              <option value="">Select Departure Airport</option>
              {airportCodes.map((airportCode) => (
                <option key={airportCode} value={airportCode}>{airportCode}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Ticket Price: (IN USD)
            <input type="text" name="ticketPrice" value={flightDetails.ticketPrice} onChange={handleChange} className="form-control" />
          </label>
        </div>
        <div className="form-group">
          Arrival Time:
        <label style={{ display: 'flex', alignItems: 'center' }}>
  <select name="arrivalTime" value={flightDetails.arrivalHour} onChange={handleChange} className="form-control">
      <option value="">Hour</option>
      {[...Array(12).keys()].map(hour => (
        <option key={hour + 1} value={(hour + 1).toString().padStart(2, '0')}>{(hour + 1).toString().padStart(2, '0')}</option>
      ))}
    </select>
    <span>&nbsp;</span>
    <select name="arrivalPeriod" value={flightDetails.arrivalPeriod} onChange={handleChange} className="form-control">
      <option value="">AM</option>
      <option value="PM">PM</option>
    </select>
          </label>
        </div>
        <div className="form-group">
        Departure Time:
          <label style={{ display: 'flex', alignItems: 'center' }}>
  <select name="departureTime" value={flightDetails.departureHour} onChange={handleChange} className="form-control">
    <option value="">Hour</option>
    {[...Array(12).keys()].map(hour => (
      <option key={hour + 1} value={(hour + 1).toString().padStart(2, '0')}>{(hour + 1).toString().padStart(2, '0')}</option>
    ))}
  </select>
  <span>&nbsp;</span>
  <select name="departurePeriod" value={flightDetails.departurePeriod} onChange={handleChange} className="form-control">
    <option value="">AM</option>
    <option value="PM">PM</option>
  </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Aircraft ID:
            <select value={flightDetails.aircraftId} onChange={(e) => handleDropdownChange('aircraftId', e.target.value)} className="form-control">
              <option value="">Select Aircraft ID</option>
              {aircraftIds.map((aircraftId) => (
                <option key={aircraftId} value={aircraftId}>{aircraftId}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Airline ID:
            <select value={flightDetails.airlineId} onChange={(e) => handleDropdownChange('airlineId', e.target.value)} className="form-control">
              <option value="">Select Airline ID</option>
              {airlineIds.map((airlineId) => (
                <option key={airlineId} value={airlineId}>{airlineId}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
