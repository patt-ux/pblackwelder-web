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
    message: ''
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
          message: ''
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
    if (!formData.message || formData.message.trim() === '') {
      setAlertType('error');
      setAlertMessage('Message is required');
      return false;
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
          <h3 className="st-contact-title">Just say Hello</h3>
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
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Your Subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
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