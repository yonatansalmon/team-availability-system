import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul className='links-container'>
        <li className='nav-item'>
          <Link to="/" className='nav-link'>Login</Link>
        </li>
        <li className='nav-item'>
          <Link to="/status" className='nav-link'>Status</Link>
        </li>
        <li className='nav-item'>
          <Link to="/signup" className='nav-link'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
