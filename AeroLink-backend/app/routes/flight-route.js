import express from "express";
import * as flightController from "../controllers/flight-controller.js"
// refresh token route
const flightRouter = express.Router();

flightRouter
  .route("/getAllFlights")
  .get(flightController.getAllFlights);

  flightRouter
  .route("/:id")
  .get(flightController.getFlightByID);

  flightRouter
  .route("/filteredFlights")
  .post(flightController.flightFilter);

  flightRouter
  .route("/book")
  .post(flightController.bookFlight);
  export default flightRouter;