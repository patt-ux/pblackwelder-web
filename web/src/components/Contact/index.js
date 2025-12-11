import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { saveContactSubmission } from '../../util/firestore';

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    position: '',
    location: '',
    website: '',
    expectedStartDate: '',
    jobDescription: '',
    budget: '',
    timeline: '',
    projectDescription: ''
  });

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear alert when user starts typing
    if (alertMessage) {
      setAlertMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check if reCAPTCHA is loaded
    if (!executeRecaptcha) {
      setAlertType('error');
      setAlertMessage('reCAPTCHA is not loaded. Please refresh the page and try again.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      const result = await saveContactSubmission(formData, recaptchaToken);
      
      if (result.success) {
        setAlertType('success');
        setAlertMessage('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
          position: '',
          location: '',
          website: '',
          expectedStartDate: '',
          jobDescription: '',
          budget: '',
          timeline: '',
          projectDescription: ''
        });
      } else {
        setAlertType('error');
        setAlertMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Sorry, there was an error sending your message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!formData.name || formData.name.trim() === '') {
      setAlertType('error');
      setAlertMessage('Name is required');
      return false;
    }
    if (!formData.email || formData.email.trim() === '') {
      setAlertType('error');
      setAlertMessage('Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertType('error');
      setAlertMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.subject || formData.subject.trim() === '') {
      setAlertType('error');
      setAlertMessage('Subject is required');
      return false;
    }
    // Validate based on subject type
    if (formData.subject === 'general') {
      if (!formData.message || formData.message.trim() === '') {
        setAlertType('error');
        setAlertMessage('Message is required');
        return false;
      }
    } else if (formData.subject === 'job') {
      if (!formData.company || !formData.position || !formData.jobDescription) {
        setAlertType('error');
        setAlertMessage('Please fill in all required job fields');
        return false;
      }
    } else if (formData.subject === 'project') {
      if (!formData.budget || !formData.timeline || !formData.projectDescription) {
        setAlertType('error');
        setAlertMessage('Please fill in all required project fields');
        return false;
      }
    }
    return true;
  };

  return (
    <section id="contact" className="st-dark-bg">
    <div className="st-height-b100 st-height-lg-b80"></div>
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">CONTACT ME</h4>
        <h2 className="st-section-heading-subtitle">CONTACT ME</h2>
      </div>
      <div className="st-height-b25 st-height-lg-b25"></div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 m-auto">
          {alertMessage && (
            <div 
              id="st-alert" 
              className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'}`}
              style={{ 
                marginBottom: '20px',
                padding: '12px 15px',
                borderRadius: '4px',
                backgroundColor: alertType === 'success' ? '#d4edda' : '#f8d7da',
                color: alertType === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${alertType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
              }}
            >
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="st-contact-form" id="contact-form">
            <div className="st-form-field">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="st-form-field">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="st-form-field">
              <label htmlFor="subject">Reason for Contact</label>
              <select 
                name="subject" 
                id="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a reason...</option>
                <option value="general">General Question</option>
                <option value="job">Recruiter / Job Opportunity</option>
                <option value="project">Freelance / Project Inquiry</option>
              </select>
            </div>
            {formData.subject === 'general' && (
            <div className="st-form-field">
                <textarea 
                  cols="30" 
                  rows="10" 
                  id="msg" 
                  name="message" 
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
            </div>
            )}
            {formData.subject === 'job' && (
                <>
                <div className="st-form-field">
                <input type="text" id="company" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
                </div>
                <div className="st-form-field">
                <input type="text" id="position" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className="st-form-field">
                <input type="text" id="location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="st-form-field">
                <input type="text" id="website" name="website" placeholder="Website" value={formData.website} onChange={handleChange} required />
                </div>
                <div className="st-form-field">
                <label htmlFor="expectedStartDate">Expected Start Date</label>
                <select 
                  name="expectedStartDate" 
                  id="expectedStartDate"
                  value={formData.expectedStartDate}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-3-months">1-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="6-12-months">6-12 Months</option>
                  <option value="other">Other</option>
                </select>
                </div>
              <div className="st-form-field">
                  <textarea 
                    cols="30" 
                    rows="10" 
                    id="jobDescription" 
                    name="jobDescription" 
                    placeholder="Job Description" 
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
              </div>
            </>
            )}
            {formData.subject === 'project' && (
              <>
                <div className="st-form-field">
                <input type="text" id="budget" name="budget" placeholder="Project Budget" value={formData.budget} onChange={handleChange} required />
                </div>
                <div className="st-form-field">
                  <label htmlFor="timeline">Project Timeline</label>
                  <select 
                    name="timeline" 
                    id="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="small">Quick (1-3 Months)</option>
                    <option value="medium">Medium (3-6 Months)</option>
                    <option value="large">Large (6-12 Months)</option>
                    <option value="extra-large">Extra Large (12-24 Months)</option>
                  </select>
                </div>
                <div className="st-form-field">
                <textarea 
                  cols="30" 
                  rows="10" 
                  id="projectDescription" 
                  name="projectDescription" 
                  placeholder="Project Description" 
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              </>
            )}
            <button 
              className="st-btn st-style1 st-color1" 
              type="submit" 
              id="submit" 
              name="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
        <div className="st-height-b0 st-height-lg-b30"></div>
      </div>
    </div>
    <div className="st-height-b100 st-height-lg-b80"></div>
    </section>
  );
};

const Contact = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default Contact;