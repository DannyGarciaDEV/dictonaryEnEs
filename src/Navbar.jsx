import React from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar">
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      <ul className="nav-links">
        <li><Link to="/App">Home</Link></li>
        <li><Link to="/FlashCards">FlashCards</Link></li>
       
      </ul>
    </div>
  );
};

export default Navbar;