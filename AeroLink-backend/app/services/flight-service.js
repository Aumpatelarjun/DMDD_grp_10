import executeQuery from "../db.js";
export const getAllFlights = async () => {
  try {
    const query = `SELECT * FROM Flight`;
    const result = await executeQuery(query); // Await the execution of the query
    console.log("Query result:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to propagate it if needed
  }
};

export const filterFlights = async (arrivalCode,departureCode,airlineID,departureTime) => {
  try {
    const query =   `EXEC GetFlightsByAttributes 
    @Arrival_Airport_Code = '${arrivalCode}',
    @Departure_Airport_Code = '${departureCode}',
    @Airline_ID = '${airlineID}',
    @Departure_time = '${departureTime}' `;
    const result = await executeQuery(query); // Await the execution of the query
    console.log("Query result:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to propagate it if needed
  }

}

export const getFlightByID = async (id) => {
  try {
    const query = `SELECT * FROM Flight WHERE Flight_ID = '${id}'`;
    const result = await executeQuery(query); // Await the execution of the query
    console.log("Query result:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to propagate it if needed
  }
}
export const bookFlight = async (username,flightID,origin,destination,seat,insurance,paymentType) => {
  try {
    const query = `EXEC BookFlight
    @p_Username = '${username}',
    @p_Flight_ID = '${flightID}', 
    @p_Departure_Airport_Code = '${origin}', 
    @p_Arrival_Airport_Code = '${destination}', 
    @p_Seat_No = '${seat}', 
    @p_Travel_Insurance = '${insurance}', 
    @p_Payment_Type = '${paymentType}';`
    const result = await executeQuery(query); // Await the execution of the query
    console.log("Query result:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to propagate it if needed
  }

}