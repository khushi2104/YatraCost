// AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us" id='about'>
      <div className="text-sec">
      <h2>About Us</h2>
      <p>Welcome to our fare estimator platform. We aim to provide accurate fare estimates for your travel needs.</p>
      <p>Our mission is to make your travel planning easier and more efficient.</p>
      </div>

      <div className="img-sec">
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/about-us-10487023-8529328.png" alt="" />
      </div>
    </section>
  );
};

export default AboutUs;
