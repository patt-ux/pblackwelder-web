import React from 'react';
import './Footer.css';
import logo from '../assets/logo.svg';

function Footer() {
  return (
    <footer className="footer section">
    <div className="footer-content">
      <div className="footer-section dt-text-left">
        <h3>PBlackwelder Web</h3>
        <p>Building amazing web experiences.</p>
      </div>
      <div className="footer-section">
        <div className="social-media">
          <a href="#" className="social-link">Facebook-f</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">instagram</a>
          <a href="#" className="social-link">Dribbble</a>
          <a href="#" className="social-link">youtube</a>
        </div>
      </div>
    </div>
      <div className="footer-bottom">
      <div className="footer-content">
          <div className="copyright">
            Copyright © 2025 by Patricia Blackwelder. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 