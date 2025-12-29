import React from 'react';
import heroImage from '../../assets/hero-grad.webp';

const Hero = () => (
  <>
    <div className="st-height-b80 st-height-lg-b80"></div>
    <section id="home" className="st-hero-wrap st-parallax">
      <div className="st-hero st-style1 st-ripple-version">
        <div className="container">
          <div className="st-hero-text">
            <h3>Hello, I’m</h3>
            <h1>Patricia <br />Blackwelder</h1>
            <h2>Full-Stack Developer & Cloud Architect</h2>
            <div className="st-hero-btn">
              <a href="#contact" className="st-btn st-style1 st-color1 st-smooth-move">Hire me</a>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Image - Social Link Group */}
      <div className="st-hero-img st-to-right">
        <img className="wow fadeInRight" src={heroImage} alt="Hero" />
        {/* <div className="st-social-group wow fadeInLeft">
          <div className="st-social-link">
            <a href="https://github.com/patt-ux" className="st-social-btn">
              <span className="st-social-icon"><i className="fab fa-github"></i></span>
              <span className="st-icon-name">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/pblackwelderux/" className="st-social-btn active">
              <span className="st-social-icon"><i className="fab fa-linkedin"></i></span>
              <span className="st-icon-name">LinkedIn</span>
            </a>
          </div>
        </div> */}
      </div>
      <div id="particles-js"></div>
    </section>
  </>
);

export default Hero;