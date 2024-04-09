import React, { useEffect, useState } from 'react';
import { getAccountDetails } from '../../services';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const [accountDetails, setAccountDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user')).data[0];
        const data = await getAccountDetails(userData.Account_ID);
        setAccountDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching account details:', error);
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="confirmation-container">
      <h2>Confirmation Page</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        accountDetails.map((details, index) => (
          <div className="account-details" key={index}>
            <h3>Reservation Details</h3>
            <p>Account ID: {details.Account_ID}</p>
            <p>Flight ID: {details.Flight_ID}</p>
            <p>Reservation ID: {details.Reservation_ID}</p>
            <p>Reservation Status: {details.Reservation_Status}</p>
            <p>Reservation Date: {details.Reservation_date}</p>
            <p>Seat No: {details.Seat_No}</p>
            <p>Travel Insurance: {details.Travel_Insurance}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ConfirmationPage;
