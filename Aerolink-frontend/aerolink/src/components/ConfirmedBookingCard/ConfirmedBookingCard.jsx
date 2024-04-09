import React from 'react';
import './ConfirmedBookingCard.css';

const ConfirmedBookingCard = ({ booking }) => {
  return (
    <div className="confirmed-booking-card">
      <h2>Booking ID: {booking.bookingID}</h2>
      <p>Username: {booking.username}</p>
      <p>Flight ID: {booking.flightID}</p>
      <p>Origin: {booking.origin}</p>
      <p>Destination: {booking.destination}</p>
      <p>Seat: {booking.seat}</p>
      <p>Travel Insurance: {booking.insurance}</p>
      <p>Payment Type: {booking.paymentType}</p>
    </div>
  );
};

export default ConfirmedBookingCard;
