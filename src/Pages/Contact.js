import React from 'react';
import '../css files/Contact.css'

function Contact(){
    return(
        <div className="contact-page">
        
        <header className="header">
      <h1 className="title">Contact Us</h1>
    </header>

    <section className="contact-section">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-text">
      We are here to assist you with all your career needs. Connect with us for any queries related to resume submissions, job postings, or applications. Reach out through any of the following methods.
      </p>
      <div className="contact-grid">
        <div className="contact-card">
          <h3 className="card-title">Call Us</h3>
          <p className="card-text">+91 97294-*****</p>
        </div>
        <div className="contact-card">
          <h3 className="card-title">Email Us</h3>
          <p className="card-text">Job Portal@gmail.com</p>
        </div>
        <div className="contact-card">
          <h3 className="card-title">Visit Us</h3>
          <p className="card-text">123 Main Street, Sirsa, Haryana, India</p>
        </div>
      </div>
    </section>
    <section className="container">
      <div className="content">
        <div className="text-center"style={{paddingTop:"20px"}} >
          <h2>Visit Our Office</h2>
          <p>Come and visit us to discuss your real estate needs and find your dream property.</p>
        </div>
        <div className="content">
    <div className="grid-container">
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Map"
        />
      </div>
      <div className="info-box">
        <div className="info">
          <h3>Our Address</h3>
          <p>123 Main Street, Sirsa, Haryana, India</p>
        </div>
        <div className="info">
          <h3>Office Hours</h3>
          <p>Monday - Friday: 9am - 6pm</p>
          <p>Saturday: 10am - 4pm</p>
          <p>Sunday: Closed</p>
        </div>
        <div className="info">
          <h3>Contact</h3>
          <p>Email: Job Portal@gmail.com</p>
          <p>Phone: +91 97294-*****</p>
        </div>
      </div>
    </div>
  </div>
      </div>
    </section>
    <section className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-items">
        <div className="faq-box">
          <h3>How can I apply for a job?</h3>
          <p>You can apply by creating an account, uploading your resume, and submitting applications directly through our platform.</p>
        </div>
        <div className="faq-box">
          <h3>Do I need to create an account to apply for jobs?</h3>
          <p>Yes, creating an account allows you to upload your resume, track applications, and receive job notifications.</p>
        </div>
        <div className="faq-box">
          <h3>How will I know if my application is shortlisted?</h3>
          <p> You will receive an email notification or can check your application status on your dashboard.</p>
        </div>
      </div>
    </section>
       
        </div>
    );
}
export default Contact