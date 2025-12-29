import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCloud, faPalette, faBolt, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';
import chromeExtensionIcon from '../../assets/chrome-logo.svg';
import wordpressIcon from '../../assets/wplogo.svg';
/*
Full-Stack Web & Mobile Development

UI/UX Design & Frontend Engineering

Cloud Architecture (Google Cloud Certified)

WordPress & Elementor Plugin Development

Chrome Extension & Web Tool Creation

API Integration & Automation
*/

export default function Services() {
  const services = [
    {
      title: 'Full-Stack Web & Mobile Development',
      description: 'Building robust, scalable applications with modern technologies including React, PHP, GoLang, and Python.',
      iconClass: 'faCode',
    },
    {
      title: 'API Integration & Automation',
      description: 'Building RESTful APIs and integrating third-party services to enhance application functionality.',
      iconClass: 'faCode',
    },
    {
      title: 'Cloud Architecture (Google Cloud Certified)',
      description: 'Designing and implementing scalable cloud solutions using Google Cloud Platform (GCP) and AWS.',
      iconClass: 'faCloud',
    },
    {
      title: 'UI/UX Design & Frontend Engineering',
      description: 'Designing intuitive, user-friendly interfaces and optimizing frontend performance for seamless user experiences.',
      iconClass: 'faPalette',
    },
    {
      title: 'WordPress & Elementor Plugin Development',
      description: 'Creating custom WordPress themes and plugins for seamless content management and user experiences.',
      iconClass: 'faWordpress',
    },
    {
      title: 'Chrome Extension & Web Tool Creation',
      description: 'Developing custom Chrome extensions and web tools to enhance productivity and user experiences.',
      iconClass: 'faChrome',
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing application performance and scalability to ensure optimal user experiences.',
      iconClass: 'faBolt',
    },
    { title: 'Team Management',
      description: 'Leading high-impact development initiatives and managing cross-functional teams to deliver successful projects.',
      iconClass: 'faUsers',
    },
    { title: 'Technical Writing',
      description: 'Technical Specifciatios, Architecture Diagrams, Runbooks,Test Jam Documents, Team Documentation and best practices.',
      iconClass: 'faBook',
    }    
  ];
  return (
  <section id="resume">
    <div className="st-height-b100 st-height-lg-b80"></div>
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">CORE COMPETENCIES</h4>
        <h2 className="st-section-heading-subtitle">CORE COMPETENCIES</h2>
        <div className="pt-4">
          <p className="pt-4">Software Engineer and GCP-Certified Cloud Architect with 28+ years of experience designing, building, and deploying scalable, high-performance applications.</p>
        </div>
      </div>
      <div className="st-height-b25 st-height-lg-b25"></div>
    </div>
    {/* Iconbox Container */}
    <div className="container">
      <div className="row">
        {/* Service 1 */}
        {services.map((service, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="st-iconbox st-style1">
            <div className="st-iconbox-icon">
              {service.iconClass === 'faCode' && <FontAwesomeIcon icon={faCode} />}
              {service.iconClass === 'faCloud' && <FontAwesomeIcon icon={faCloud} />}
              {service.iconClass === 'faPalette' && <FontAwesomeIcon icon={faPalette} />}
              {service.iconClass === 'faWordpress' && <img className="st-wp-logo" src={wordpressIcon} alt="WordPress" />}
              {service.iconClass === 'faChrome' && <img className="st-chrome-logo" src={chromeExtensionIcon} alt="Chrome Extension" />}
              {service.iconClass === 'faBolt' && <FontAwesomeIcon icon={faBolt} />}
              {service.iconClass === 'faUsers' && <FontAwesomeIcon icon={faUsers} />}
              {service.iconClass === 'faBook' && <FontAwesomeIcon icon={faBook} />}
            </div>
            <h2 className="st-iconbox-title">{service.title}</h2>
            <div className="st-iconbox-text">{service.description}</div>
          </div>
          <div className="st-height-b30 st-height-lg-b30"></div>
        </div>
        ))}
      </div>
    </div>
  </section>
  );
}