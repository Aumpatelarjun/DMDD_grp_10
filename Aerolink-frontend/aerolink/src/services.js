import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllFlights = async () => {
  try {
    const response = await axios.get(`${API_URL}/flight/getAllFlights`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const filterFlights = async(filter) =>{
  try {
    const response = await axios.post(`${API_URL}/flight/filteredFlights`,filter);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getFlightByID = async(id) =>{
  try {
    const response = await axios.get(`${API_URL}/flight/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const bookFlight = async(bookingDetails) =>{
  try {
    const response = await axios.post(`${API_URL}/flight/book`,bookingDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getAccountDetails = async (accountID) => {
  try {
    const response = await axios.get(`${API_URL}/user/account/${accountID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
