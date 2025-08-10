export const Portfolio = () => {
  return (
    <section className="portfolio-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">My Work Portfolio</h3>
            <h2 className="section-title">My Works Portfolio</h2>
          </div>
          
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-image"></div>
              <div className="portfolio-overlay">
                <div className="portfolio-content">
                  <div className="portfolio-category">Digital Marketing</div>
                  <div className="portfolio-subcategory">Art, Direction</div>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image"></div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image"></div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image"></div>
            </div>
          </div>
          
          <div className="portfolio-cta">
            <button className="more-works-btn">More works</button>
          </div>
        </div>
      </section>
  )
};