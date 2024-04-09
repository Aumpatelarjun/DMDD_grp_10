import * as userService from "../services/user-service.js";
import { setDataResponse, setDataErrorResponse } from './simple-response-handler.js'
import { setResponse, setErrorResponse } from '../utility/response-handler.js'
// Controller for Discover API
export const getUser = async (request, response) => {
    try {
      const id = request.params.id;
      const user = await userService.getUser(id);
      console.log("getuser",user);
      setDataResponse({"type":"GET_USER_BY_ID","data":user}, response);
    } catch (error) {
        setDataErrorResponse(error, response)
    }
}
export async function register(req, res) {
  const { username, password, email } = req.body;

  try {
      const user = await userService.registerUser(username, password, email);
      console.log(user);
      setResponse({"type":"CREATED User","data":user}, res);
      
  } catch (error) {
      console.error('Error registering user:', error);
      setDataErrorResponse(error, res)
  }
}

// Login a user
export async function login(req, res) {
  const { username, password } = req.body;
    console.log(username, password); 
  try {
      const result = await userService.loginUser(username, password);
      if (result) {
          res.status(200).json({ success: true, message: 'Login successful', data: result });
      } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ success: false, message: 'Failed to log in user' });
  }
}

export async function searchUserByEmailId(req, res) {
    const emailID = req.params.email;
    try {
        const result = await userService.searchUserByEmailId(emailID);
        setResponse({"type":"User found","data":result}, res);

    } catch (error) {
        console.error('Error registering user:', error);
        setDataErrorResponse(error, res)
    }
}

export async function getReservationDetails(req, res) {
    const accountID = req.params.accountID;
    console.log(accountID,"accountId");
    try {
        const result = await userService.getReservationDetails(accountID);
        setResponse({"type":"Reservation","data":result}, res);

    } catch (error) {
        console.error('Incorrect AccountID:', error);
        setDataErrorResponse(error, res)
    }
}