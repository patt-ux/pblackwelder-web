import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HomePage.css';
import heroImage from '../assets/hero.png';
import { Contact } from '../components/Contact';

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
          <div className="hero-image">
            <img src={heroImage} alt="Patricia Blackwelder" />
          </div>
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

      {/* Skills Section */}
      <section className="skills-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">Technical Expertise</h3>
            <h2 className="section-title">Skills & Technologies</h2>
          </div>
          
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">SASS</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-tags">
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">GoLang</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C#/.NET</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">REST APIs</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Cloud & DevOps</h3>
              <div className="skill-tags">
                <span className="skill-tag">Google Cloud Platform</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">CI/CD</span>
                <span className="skill-tag">Terraform</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Databases & Tools</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Redis</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Jira</span>
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
            <h3 className="section-subtitle">Featured Work</h3>
            <h2 className="section-title">Portfolio & Projects</h2>
          </div>
          
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-thumbnail">
                <div className="portfolio-placeholder">Project 1</div>
              </div>
              <div className="portfolio-content">
                <h3>SaaS Platform Architecture</h3>
                <p>Designed and implemented scalable microservices architecture for enterprise SaaS platform</p>
                <div className="portfolio-tags">
                  <span>React</span>
                  <span>GoLang</span>
                  <span>GCP</span>
                </div>
              </div>
            </div>
            
            <div className="portfolio-item">
              <div className="portfolio-thumbnail">
                <div className="portfolio-placeholder">Project 2</div>
              </div>
              <div className="portfolio-content">
                <h3>Cloud Migration Strategy</h3>
                <p>Led successful migration of legacy systems to cloud-native architecture</p>
                <div className="portfolio-tags">
                  <span>AWS</span>
                  <span>Docker</span>
                  <span>CI/CD</span>
                </div>
              </div>
            </div>
            
            <div className="portfolio-item">
              <div className="portfolio-thumbnail">
                <div className="portfolio-placeholder">Project 3</div>
              </div>
              <div className="portfolio-content">
                <h3>Full-Stack E-commerce</h3>
                <p>Built high-performance e-commerce platform with modern tech stack</p>
                <div className="portfolio-tags">
                  <span>PHP</span>
                  <span>React</span>
                  <span>MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="companies-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">Trusted By</h3>
            <h2 className="section-title">Companies I've Worked With</h2>
          </div>
          
          <div className="companies-grid">
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company A</div>
              </div>
              <p className="company-name">Company A</p>
            </div>
            
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company B</div>
              </div>
              <p className="company-name">Company B</p>
            </div>
            
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company C</div>
              </div>
              <p className="company-name">Company C</p>
            </div>
            
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company D</div>
              </div>
              <p className="company-name">Company D</p>
            </div>
            
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company E</div>
              </div>
              <p className="company-name">Company E</p>
            </div>
            
            <div className="company-item">
              <div className="company-logo">
                <div className="company-placeholder">Company F</div>
              </div>
              <p className="company-name">Company F</p>
            </div>
          </div>
          
          <div className="companies-cta">
            <p>For detailed work history and experience, please request my CV</p>
            <button className="request-cv-btn btn btn-lg">Request CV</button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-marker">*</div>
            <h3 className="section-subtitle">Thought Leadership</h3>
            <h2 className="section-title">Articles & Insights</h2>
          </div>
          
          <div className="articles-grid">
            <div className="article-item">
              <div className="article-thumbnail">
                <div className="article-placeholder">Coming Soon</div>
              </div>
              <div className="article-content">
                <h3>Cloud Architecture Best Practices</h3>
                <p>Learn the key principles for designing scalable and resilient cloud infrastructure</p>
                <div className="article-meta">
                  <span className="article-category">Cloud Computing</span>
                  <span className="article-date">Coming Soon</span>
                </div>
              </div>
            </div>
            
            <div className="article-item">
              <div className="article-thumbnail">
                <div className="article-placeholder">Coming Soon</div>
              </div>
              <div className="article-content">
                <h3>Leading High-Performance Teams</h3>
                <p>Strategies for building and managing successful development teams</p>
                <div className="article-meta">
                  <span className="article-category">Leadership</span>
                  <span className="article-date">Coming Soon</span>
                </div>
              </div>
            </div>
            
            <div className="article-item">
              <div className="article-thumbnail">
                <div className="article-placeholder">Coming Soon</div>
              </div>
              <div className="article-content">
                <h3>Modern Full-Stack Development</h3>
                <p>Building robust applications with contemporary technologies and patterns</p>
                <div className="article-meta">
                  <span className="article-category">Development</span>
                  <span className="article-date">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}


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
     <Contact />
      <Footer />
    </div>
  );
}

export default HomePage; 