export const Contact = () => {
  return (
    <section className="contact-section section">
    <div className="container">
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-circle">
            <div className="contact-icon">📧</div>
          </div>
          <div className="contact-details">
            <h3>Mail: patty@pblackwelder.com</h3>
            <p>I'm always looking for new opportunities and collaborations. Feel free to reach out to me via email or connect with me on social media.</p>
          </div>
          <div className="social-links">
            <span className="social-label">Follow Me</span>
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
  )
};