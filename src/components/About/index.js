import React from 'react';
import aboutImage from '../../assets/headshot.webp';

const About = () => (
  <section id="about" className="st-about-wrap">
    <div className="st-height-b100 st-height-lg-b80"></div>
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">ABOUT ME</h4>
        <h2 className="st-section-heading-subtitle">ABOUT ME</h2>
      </div>
      <div className="st-height-b25 st-height-lg-b25"></div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 wow fadeInLeft">
          <div className="st-about-img-wrap">
            <div className="st-about-img st-dynamic-bg st-bg" style={{backgroundImage: `url(${aboutImage})`}}></div>
          </div>
          <div className="st-height-b0 st-height-lg-b30"></div>
        </div>
        <div className="col-lg-6">
          <div className="st-vertical-middle">
            <div className="st-vertical-middle-in">
              <div className="st-text-block st-style1">
                <h2 className="st-text-block-title">Hi There! I'm Patricia Blackwelder</h2>
                <h4 className="st-text-block-subtitle">Full-Stack Developer & Cloud Architect</h4>
                <div className="st-text-block-text">
                <p>I have a passion for leading high-impact development initiatives and architecting robust, scalable applications. 
                  With over two decades of experience across diverse industries, I specialize in full-stack development, 
                  utilizing technologies like PHP, GoLang, Python, React, and C#/.NET.</p>
                </div>
                <div className="st-text-block-btn">
                  <a href="#" className="st-btn st-style1 st-color1">Download CV</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;