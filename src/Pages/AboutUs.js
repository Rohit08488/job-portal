import React from 'react';
import aboutuspic from '../images/aboutuspic.png';
import '../css files/AbouUs.css'
import ourstory from '../images/ourstory.jpg'
import admin from '../images/admin.jpg'

function AboutUs(){
    return(
        <>
       
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
         
        </div>
      </div>
    </div>

    <section className="our-mission">
      <h2>Our Mission</h2>
      <p>
      Our mission is to bridge the gap between job seekers and employers by providing a seamless, secure, and efficient job search experience. We strive to help individuals find the right opportunities while enabling companies to discover top talent with ease and confidence.
      </p>
    </section>

    <section className="our-vision">
      <h2>Our Vision</h2>
      <p>
      To be the most trusted job portal, connecting talented individuals with the right opportunities while enabling companies to find top professionals effortlessly. We aim to simplify the hiring process with innovation, integrity, and a candidate-first approach.
      </p>
    </section>

    <div className="aboutusss" style={{padding:"200px"}}>
  
  
  <div className="hghjj">
    <h2>Our Story</h2>
    <p>At Job Portal, we started with a simple yet powerful idea: connecting students with the right career</p>
    <p> opportunities should be effortless, transparent, and efficient. Founded in 2024, Job Portal was</p>
    <p> created to bridge the gap between talented students and top companies, making the job search process</p>
    <p> smoother and more rewarding..</p>
  </div>
  <div className="circle">
    <img src={ourstory} alt="First Icon" className="circle-img" />
  </div>

</div>

<div className="aboutu" style={{padding:"200px"}}>
  
  <div className="circletoright">
    <img src={admin} alt="First Icon" className="circle-img2" />
  </div>
  <div className="hghjjtoright">
    <h2>A Letter from Our CEO</h2>
    <p>At Job Portal, our mission is to connect students with the best career opportunities effortlessly.</p>
    <p>We prioritize transparency, reliability, and innovation to make job searching simpler and smarter.</p>
    <p>— Rohit, CEO & Founder</p>
  </div>
  </div>
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


        
        </>
    );
}
export default AboutUs;