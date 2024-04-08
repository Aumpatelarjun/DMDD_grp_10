import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FlightSearch from './pages/Flight Search/FlightSearch';
import FlightDetails from './pages/FlightDetails';
import AirportManage from './pages/Flight-Manage/AirportManage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
import FlightExplorePage from './pages/FlightExplorePage/FlightExplorePage';
import FlightSpecificPage from './pages/FlightSpecificPage/FlightSpecificPage';
import BookFlight from './pages/BookFlight/BookFlight';
import AddFlight from './pages/Add-Flight/AddFlight';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/search" element={<FlightSearch/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Homepage/>} />
        <Route path="/flight-details/:id" component={FlightDetails} />
        <Route path="/manage" element={<AirportManage />} />
        <Route exact path="/flight/:flightId" element={<FlightSpecificPage/>} />
        <Route path="/explore" element={<FlightExplorePage/>} />
        <Route path="/bookFlight" element={<BookFlight/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Homepage/>} />
        {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} /> */}
        {/* Add more routes as needed */}
        <Route path="/addFlight" element={<AddFlight />} />
      </Routes>
    </Router>
  );
}

export default App;
