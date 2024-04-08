import * as flightService from "../services/flight-service.js";
import { setDataResponse, setDataErrorResponse } from './simple-response-handler.js'
import { setResponse, setErrorResponse } from '../utility/response-handler.js'
export const getAllFlights = async (request, response) => {
  try {
    const flights = await flightService.getAllFlights();
    console.log("getFlights",flights);
    setResponse({"type":"GET_FLIGHTS","data":flights}, response);
  } catch (error) {
      setErrorResponse(error, response)
  }
}
export const flightFilter = async (req, response) => {
  try {
    const { arrivalCode,departureCode,airlineID,departureTime} = req.body;
    console.log(req.body,"req.body");
    const flights = await flightService.filterFlights(arrivalCode,departureCode,airlineID,departureTime);
    console.log("filtered Flights",flights);
    setResponse({"type":"FILTERED_FLIGHTS","data":flights}, response);
  } catch (error) {
      setErrorResponse(error, response)
  }
}
export const getFlightByID = async (req, response) => {
  try {
    const id  = req.params.id;
    console.log(id);
    const flights = await flightService.getFlightByID(id);
    setResponse({"type":"FLIGHT_BY_ID","data":flights}, response);
  } catch (error) {
      setErrorResponse(error, response)
  }
}
export const bookFlight = async (req, response) => {
  try {
    const { username,flightID,origin,destination,seat,insurance,paymentType } = req.body;
    const flights = await flightService.bookFlight(username,flightID,origin,destination,seat,insurance,paymentType);
    console.log("BOOKED FLIGHT",flights);
    setResponse({"type":"FILTERED_FLIGHTS","data":flights}, response);
  } catch (error) {
      setErrorResponse(error, response)
  }
}