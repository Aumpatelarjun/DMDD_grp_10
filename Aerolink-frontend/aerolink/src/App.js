import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FlightSearch from './pages/Flight Search/FlightSearch';

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
        {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
