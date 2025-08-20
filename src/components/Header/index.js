import React from 'react';
import logo from '../../assets/logo.svg';
import './index.css';

const Header = () => {
  return (
    <header className="st-site-header st-style1 st-sticky-header">
      <div className="st-main-header">
        <div className="container">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <a className="st-site-branding" href="#home">
                <img src={logo} alt="Davis" />
              </a>
            </div>
            {/* <div className="st-main-header-right">
              <div className="st-nav">
                <ul className="st-nav-list st-onepage-nav">
                  <li><a href="#home" className="st-smooth-move">Home</a></li>
                  <li><a href="#about" className="st-smooth-move">About</a></li>
                  <li><a href="#resume" className="st-smooth-move">Resume</a></li>
                  <li><a href="#portfolio" className="st-smooth-move">Portfolio</a></li>
                  <li><a href="#blog" className="st-smooth-move">Blog</a></li>
                  <li><a href="#contact" className="header-color1 st-smooth-move">Contact</a></li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 