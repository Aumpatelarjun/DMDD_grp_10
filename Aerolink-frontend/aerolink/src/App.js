import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FlightSearch from './pages/Flight Search/FlightSearch';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
import FlightExplorePage from './pages/FlightExplorePage/FlightExplorePage';
import FlightSpecificPage from './pages/FlightSpecificPage/FlightSpecificPage';
import BookFlight from './pages/BookFlight/BookFlight';

// import Home from './pages/Home';
// import Services from './pages/Services';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/search" element={<FlightSearch/>} />
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
      </Routes>
    </Router>
  );
}

export default App;
