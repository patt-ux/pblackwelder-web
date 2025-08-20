import React from 'react';

function Portfolio() {
  const placeholderImage = process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg';
  const portfolioItems = [
    {
      title: 'Mad Game Love',
      description: 'Cloud-Enabled Gaming Community Platform',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project1',
      tech: 'React, Firebase Authentication, Firestore, Google Cloud Functions, GCP Hosting'
    },{
      title: 'Minecraft Server Manager',
      description: 'Cloud-Optimized Game Server Hosting Platform',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project2',
      tech: 'Firebase Hosting, React, Google Cloud Spot VMs, Cloud Functions (Node.js), Firestore'
    },{
      title: 'Congregation Communication CRM',
      description: 'Custom CRM with SMS Outreach Capability',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project3',
      tech: 'React, .NET, Ministry Platform API, Twilio SMS Integration'
    },
    {
      title: 'Customer Recommendation & Notification System',
      description: 'Cloud-Integrated Recommendation Engine for SaaS Marketing Platform',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project4',
      tech: 'PHP, MySQL, Google Cloud Storage, Python, React, Twirp Protocols'
    }
  ];
  return (
  <section id="portfolio">
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">PORTFOLIO</h4>
        <h2 className="st-section-heading-subtitle">PORTFOLIO</h2>
      </div>
      <div className="container">
        <div className="row">
      {portfolioItems.map((item, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
        <div className="st-portfolio-single st-style1 st-lightgallery">
          <div className="st-portfolio-item">
            <a href={item.link} className="st-portfolio st-zoom st-lightbox-item" target="_blank" rel="noopener noreferrer">
              <div className="st-portfolio-img st-zoom-in">
                <img src={item.image ?? placeholderImage} alt={item.title} />
              </div>
              <div className="st-portfolio-item-hover">
                <i className="fas fa-plus-circle"></i>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      ))}
          
      </div>
    </div>
    </div>
    <div className="st-height-b95 st-height-lg-b75"></div>
  </section>
  )
}

export default Portfolio;