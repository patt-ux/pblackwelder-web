import React from 'react';

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
        <img className="wow fadeInRight" src={process.env.PUBLIC_URL + "/assets/img/section/hero-img.jpg"} alt="Hero" />
        <div className="st-social-group wow fadeInLeft">
          <div className="st-social-link">
            <a href="#" className="st-social-btn active">
              <span className="st-social-icon"><i className="fab fa-dribbble"></i></span>
              <span className="st-icon-name">Dribbble</span>
            </a>
            <a href="#" className="st-social-btn">
              <span className="st-social-icon"><i className="fab fa-behance"></i></span>
              <span className="st-icon-name">Behance</span>
            </a>
            <a href="#" className="st-social-btn">
              <span className="st-social-icon"><i className="fab fa-twitter"></i></span>
              <span className="st-icon-name">Twitter</span>
            </a>
            <a href="#" className="st-social-btn">
              <span className="st-social-icon"><i className="fab fa-linkedin"></i></span>
              <span className="st-icon-name">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      <div id="particles-js"></div>
    </section>
  </>
);

export default Hero;