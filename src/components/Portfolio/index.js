import React from 'react';

function Portfolio() {
  const placeholderImage = process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg';
  const portfolioItems = [
    {
      title: 'Project 1',
      description: 'Description of Project 1',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project1'
    },{
      title: 'Project 2',
      description: 'Description of Project 2',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project2'
    },{
      title: 'Project 3',
      description: 'Description of Project 3',
      image: process.env.PUBLIC_URL + '/assets/img/portfolio/portfolio1.jpg',
      link: '/portfolio/project3'
    },
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
  </section>
  )
}

export default Portfolio;