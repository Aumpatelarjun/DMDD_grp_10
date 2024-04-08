import React from "react";
import { Link } from 'react-router-dom'
const FlightCard = ({ flight }) => {
  console.log(flight)
  return (
    <Link to={`/flight/${flight.Flight_ID}`} className="flight-card-link">
      <div className="flight-card">
        <h3>
          {flight.Departure_Airport_Code} to {flight.Arrival_Airport_Code}
        </h3>
        <p>
          Departure:{" "}
          {new Date(flight.Departure_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          Arrival:{" "}
          {new Date(flight.Arrival_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>Airline: {flight.Airline_ID}</p>
        <p>Ticket Price: ${flight.Ticket_Price}</p>
      </div>
    </Link>
  );
};

export default FlightCard;
