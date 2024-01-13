import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.css';

const Navbar = ({ isCustom }) => {
  const navbarClasses = classNames('navbar', { 'custom-class': isCustom });

  return (
    <nav className={navbarClasses}>
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/FlashCards" className="nav-link">Flash Cards</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;