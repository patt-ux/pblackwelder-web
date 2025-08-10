export const Services = () => {
  return (
    <section className="services-section section">
    <div className="container">
      <div className="section-header">
        <div className="section-marker">*</div>
        <h3 className="section-subtitle">Who i Do?</h3>
        <h2 className="section-title">Featured Services.</h2>
      </div>
      
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🎨</div>
          <h3 className="service-title">Brand Strategy & Art Direction</h3>
          <div className="service-tags">
            <span className="tag">Graphics art</span>
            <span className="tag">Sketching & layout</span>
          </div>
        </div>
        
        <div className="service-card">
          <div className="service-icon">💻</div>
          <h3 className="service-title">Frontend development & Digital Marketing</h3>
          <div className="service-tags">
            <span className="tag">Wordpress fr</span>
            <span className="tag">Link Marketing</span>
          </div>
        </div>
        
        <div className="service-card">
          <div className="service-icon">🎯</div>
          <h3 className="service-title">UX/UI Design & Website/App Design</h3>
          <div className="service-tags">
            <span className="tag">Ui/Ux Design</span>
            <span className="tag">Web & Mobile app</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};