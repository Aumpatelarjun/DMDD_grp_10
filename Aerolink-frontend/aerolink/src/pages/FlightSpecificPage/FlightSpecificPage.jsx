import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './FlightSpecificPage.css';
import { getFlightByID } from '../../services';

const FlightDetailsSpecificPage = () => {
  const { flightId  } = useParams(); // Get the flightDetails ID from URL params
  console.log(flightId );
  const [flightDetails, setFlightDetails] = useState(null); // Corrected state variable name

  useEffect(() => {
    const fetchFlightDetails = async () => { // Corrected function name
      try {
        // Fetch flightDetails details based on flightDetailsId
        const data = await getFlightByID(flightId);
        setFlightDetails(data[0]); // Corrected function call
      } catch (error) {
        console.error('Error fetching flightDetails details:', error);
      }
    };
    fetchFlightDetails();
  }, [flightId]); // Added flightDetailsId to dependency array

  return (
    <div className="flight-details-container">
    <h1>Flight Details for {flightId}</h1>
    {flightDetails && (
      <div className="flight-details">
        <p><strong>Flight ID:</strong> {flightDetails.Flight_ID}</p>
        <p><strong>Aircraft ID:</strong> {flightDetails.Aircraft_ID}</p>
        <p><strong>Model Name:</strong> {flightDetails.Model_Name}</p>
        <p><strong>Total Seats:</strong> {flightDetails.Total_Seats}</p>
        <p><strong>Registration No:</strong> {flightDetails.Registration_No}</p>
        <p><strong>Departure Airport:</strong> {flightDetails.Departure_Airport}</p>
        <p><strong>Arrival Airport:</strong> {flightDetails.Arrival_Airport}</p>
        <p><strong>Ticket Price:</strong> ${flightDetails.Ticket_Price}</p>
        <p><strong>Departure Time:</strong> {new Date(flightDetails.Departure_time).toLocaleString()}</p>
        <p><strong>Arrival Time:</strong> {new Date(flightDetails.Arrival_time).toLocaleString()}</p>
        <p><strong>Duration:</strong> {flightDetails.Duration}</p>
        <p><strong>Distance:</strong> {flightDetails.Distance}</p>
        <p><strong>Airline ID:</strong> {flightDetails.Airline_ID}</p>
        <p><strong>Departure Airport Code:</strong> {flightDetails.Departure_Airport_Code}</p>
        <p><strong>Arrival Airport Code:</strong> {flightDetails.Arrival_Airport_Code}</p>
      </div>
    )}
    {/* Booking button */}
    <Link to={`/bookFlight`}>
    <button className="booking-button">Book Now</button>
    </Link>
  </div>
  );
};

export default FlightDetailsSpecificPage;
