import React from 'react';

const ContactInfo = () => {
  return (
    <div className="col-lg-6">
    <div className="st-height-b0 st-height-lg-b40"></div>
    <h3 className="st-contact-title">Contact Info</h3>
    <div className="st-contact-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ligula nulla tincidunt id faucibus sed
      suscipit feugiat.
    </div>
    <div className="st-contact-info-wrap">
      <div className="st-social-info">
        <div className="st-social-text">Visit my social profile and get connected</div>
        <div className="st-social-link">
          <a href="#" className="st-social-btn active">
            <span className="st-social-icon"><i className="fab fa-github"></i></span>
            <span className="st-icon-name">Github</span>
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
  </div>
  );
};

export default ContactInfo;