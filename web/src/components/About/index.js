import React, { useState } from 'react';
import aboutImage from '../../assets/headshot.webp';
import { saveCVDownloadRequest } from '../../util/firestore';

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    setEmail('');
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firestore
      const result = await saveCVDownloadRequest(email);
      
      if (result.success) {
        // TODO: Replace with actual CV file path
        // You'll need to add your CV file to the public folder and update this path
        const cvPath = '/cv/Patricia-Blackwelder-CV.pdf';
        
        // Create a temporary link to download the CV
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Patricia-Blackwelder-CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close modal after download
        handleCloseModal();
      } else {
        setError('There was an error processing your request. Please try again.');
      }
    } catch (error) {
      console.error('CV download error:', error);
      setError('There was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
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
                      <a href="#" onClick={handleDownloadClick} className="st-btn st-style1 st-color1">Download CV</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Download Modal */}
      {showModal && (
        <div 
          className="cv-modal-overlay" 
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
        >
          <div 
            className="cv-modal-content"
            style={{
              backgroundColor: '#1a1f2e',
              borderRadius: '8px',
              padding: '30px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                color: '#fdfeff',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '5px 10px',
                lineHeight: '1'
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 style={{ color: '#fdfeff', marginBottom: '15px', marginTop: '0' }}>
              Download CV
            </h2>
            <p style={{ color: '#a9adb8', marginBottom: '20px' }}>
              Please enter your email address to download my resume.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="st-form-field" style={{ marginBottom: '20px' }}>
                <input
                  type="email"
                  id="cv-email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    backgroundColor: '#0a101e',
                    border: error ? '1px solid #ff4444' : '1px solid #2a2f3e',
                    borderRadius: '4px',
                    color: '#fdfeff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                {error && (
                  <div style={{ color: '#ff4444', fontSize: '14px', marginTop: '8px' }}>
                    {error}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: '1px solid #2a2f3e',
                    borderRadius: '4px',
                    color: '#fdfeff',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="st-btn st-style1 st-color1"
                  style={{
                    padding: '12px 24px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Download CV'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default About;