import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-top flex-between">
        <div className="logo">
          <span className="logo-text">pblackwelder</span>
        </div>
        <nav className="navigation">
          <ul>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <Link to="/read" className="nav-link">Read</Link>
            <Link to="/#contact" className="nav-link">Contact</Link>
          </ul>
        </nav>
        <button className="talk-button btn btn-md">
          <span>let's talk</span>
          <div className="button-indicator"></div>
        </button>
      </div>
    </header>
            
  );
}

export default Header; 