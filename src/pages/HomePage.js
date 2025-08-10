import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HomePage.css';

function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-image"></div>
        </div>
        <Header />
        
        <div className="hero-content flex-between">
          <div className="hero-left">
            <h1 className="hero-title">
              Patricia Blackwelder
            </h1>
            <p className="hero-description">
            Principal Full-Stack Developer & Cloud Architect
              Building scalable SaaS solutions with PHP, React, GCP and AWS
            </p>
            <div className="hero-buttons">
              <button className="view-works-btn btn btn-lg">Download CV</button>
              <button className="view-works-btn btn btn-lg">View Work</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-content">
            <div className="about-left">
              <h2 className="section-title">Principal Full-Stack Developer & Cloud Architect</h2>
              <p className="section-description">
                I have a passion for leading high-impact development initiatives and architecting robust, scalable applications. 
                With over two decades of experience across diverse industries, I specialize in full-stack development, 
                utilizing technologies like PHP, GoLang, Python, React, and C#/.NET. My focus is on transforming complex business 
                requirements into elegant and functional software solutions that drive growth and efficiency.
              </p>
              <p className="section-description">
                As a Google Certified Cloud Architect, I specialize in designing and implementing scalable and resilient 
                cloud infrastructure on both Google Cloud Platform and AWS. My expertise lies in architecting operational 
                and analytic tooling and leading the development of complex cloud-native applications.
              </p>
              <button className="more-about-btn">Download CV</button>
            </div>
            <div className="about-right">
              <div className="about-image"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Portfolio Section */}
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

      {/* Professional Skills Section */}
      <section className="skills-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">Professional Work</h3>
            <h2 className="section-title">Professional skill</h2>
          </div>
          
          <div className="skills-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">📅</div>
              <div className="timeline-content">
                <div className="timeline-period">2017 - 2019</div>
                <h3 className="timeline-title">Excelent product design</h3>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-icon">📅</div>
              <div className="timeline-content">
                <div className="timeline-period">2017 - 2019</div>
                <h3 className="timeline-title">lead Creative UI Designer</h3>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-icon">📅</div>
              <div className="timeline-content">
                <div className="timeline-period">2017 - 2019</div>
                <h3 className="timeline-title">Fullstack Front Developer</h3>
              </div>
            </div>
          </div>
          
          <div className="skills-grid">
            <div className="skill-item">
              <div className="skill-icon">⚡</div>
              <span className="skill-name">Vs Code</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">🎨</div>
              <span className="skill-name">Framer</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">📐</div>
              <span className="skill-name">Sketch</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">🎯</div>
              <span className="skill-name">Figma</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">🌐</div>
              <span className="skill-name">Wordpress</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">🔗</div>
              <span className="skill-name">Webflow</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">Common Questions</h3>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="faq-grid">
            <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <h3>What's your approach to leading development teams?</h3>
                <div className="faq-icon">{openFaq === 0 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I believe in servant leadership and fostering a collaborative environment where team members feel empowered to contribute their best ideas. My approach combines technical mentorship with agile methodologies, ensuring we deliver high-quality solutions while maintaining team morale and professional growth.</p>
              </div>
            </div>
            
            <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <h3>How do you handle technical debt and legacy systems?</h3>
                <div className="faq-icon">{openFaq === 1 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I assess technical debt systematically, prioritizing based on business impact and risk. For legacy systems, I create incremental migration strategies that minimize disruption while modernizing architecture. This often involves creating microservices, implementing CI/CD pipelines, and gradually replacing outdated components.</p>
              </div>
            </div>
            
            <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <h3>What's your experience with cloud migration strategies?</h3>
                <div className="faq-icon">{openFaq === 2 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I've led multiple cloud migrations using both lift-and-shift and re-architect approaches. My Google Cloud Architect certification and AWS experience allow me to design hybrid solutions that optimize costs, performance, and security. I always start with a thorough assessment and create detailed migration roadmaps.</p>
              </div>
            </div>
            
            <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                <h3>How do you ensure code quality and maintainability?</h3>
                <div className="faq-icon">{openFaq === 3 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I implement comprehensive testing strategies including unit, integration, and end-to-end tests. Code reviews, automated linting, and documentation standards are mandatory. I also advocate for pair programming and knowledge sharing sessions to maintain high code quality across the team.</p>
              </div>
            </div>
            
            <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(4)}>
                <h3>What's your strategy for scaling applications?</h3>
                <div className="faq-icon">{openFaq === 4 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I design for scale from the beginning using microservices architecture, load balancing, and auto-scaling. Database optimization, caching strategies, and CDN implementation are key. I also focus on monitoring and observability to identify bottlenecks before they become problems.</p>
              </div>
            </div>
            
            <div className={`faq-item ${openFaq === 5 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(5)}>
                <h3>How do you stay current with technology trends?</h3>
                <div className="faq-icon">{openFaq === 5 ? '−' : '+'}</div>
              </div>
              <div className="faq-answer">
                <p>I dedicate time weekly to learning new technologies and evaluating their business value. I also encourage my teams to share knowledge and experiment with emerging tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-circle">
                <div className="contact-icon">📧</div>
              </div>
              <div className="contact-details">
                <h3>Mail: webtendix.co.uk</h3>
                <p>Lorem ipsum dolor sit amet, consectet adipiscing elit.</p>
              </div>
              <div className="social-links">
                <span className="social-label">Follow Us</span>
                <div className="social-icons">
                  <span>Fb</span>
                  <span>Be</span>
                  <span>Yt</span>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Get in touch</h3>
              <form>
                <div className="form-group">
                  <label>What's your name?</label>
                  <input type="text" placeholder="Full Name here" />
                </div>
                <div className="form-group">
                  <label>Enter Your Email address?</label>
                  <input type="email" placeholder="Email address here" />
                </div>
                <div className="form-group">
                  <label>Write Message.....</label>
                  <textarea placeholder="Your message here"></textarea>
                </div>
                <button type="submit" className="send-message-btn">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage; 