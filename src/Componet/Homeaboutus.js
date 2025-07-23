import React from 'react';
import aboutuspic from '../images/aboutuspic.png';
import { Link } from 'react-router-dom';


function HomeAboutUS() {
  return (
    <div className="home-about-container">
      <div className="home-about-image">
        <div className="image">
          <img src={aboutuspic} alt="about-us-pic" className="about-img" />
        </div>
      </div>
      <div className="home-about-text">
        <div className="text">
          <span className="about-title">About us</span>
          <h2 className="about-heading">
            Discover <span className="highlight-text">Your Dream job</span>
          </h2>
          <p className="about-description">
          At Job Portal, we are dedicated to helping students and recent graduates find the perfect job that matches their skills and aspirations. With a deep understanding of the job market, our platform connects students with top companies looking for fresh talent.
            <br /><br />
            Whether you’re seeking an internship, a full-time position, or a freelance opportunity, we offer a wide range of job listings to fit your career goals. Our mission is to make your job search seamless and rewarding by providing personalized job recommendations, resume-building tools, and expert career guidance.
            <br /><br />
            Explore job openings, connect with recruiters, and take the next step toward a successful career with Job Portal. 🚀
          </p>
          <Link to="/about" className="read-more-btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeAboutUS;
