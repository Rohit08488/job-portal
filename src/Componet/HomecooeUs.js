import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserShield, faDollarSign, faList } from '@fortawesome/free-solid-svg-icons';


function HomeChooseUs() {
  return (
    <section className="home-choose-us" style={{padding:"100px"}}>
      <div className="text-center">
        <h1>Why Choose Us?</h1>
        <p>Discover why we're the top choice for your real estate needs.</p>
      </div>
      <div className="container">
        <div className="feature-list">
          
          <div className="feature-item">
            <FontAwesomeIcon icon={faHome} className="feature-icon" />
            <h2 className="feature-title">Extensive Job Listings</h2>
            <p className="feature-desc">Access a vast collection of job opportunities from top companies across various industries.</p>
          </div>

          
          <div className="feature-item">
            <FontAwesomeIcon icon={faUserShield} className="feature-icon" />
            <h2 className="feature-title">Secure & Reliable</h2>
            <p className="feature-desc">Your data is safe with us. We use advanced encryption and security measures to protect your personal information and job applications from unauthorized access.</p>
          </div>

          
          <div className="feature-item">
            <FontAwesomeIcon icon={faDollarSign} className="feature-icon" />
            <h2 className="feature-title">Transparent & Fair Opportunities</h2>
            <p className="feature-desc">Explore job opportunities with fair salaries and benefits that match your skills and experience, ensuring a rewarding career.</p>
          </div>

         
        </div>
      </div>
    </section>
  );
}

export default HomeChooseUs;
