// ContactUs.js
import React, { useState } from 'react';
import './contactus.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <section className="contact-us" id='contact'>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
      <img 
        src="https://www.ujudebug.com/wp-content/uploads/2022/07/contact-us-content.gif" 
        alt="Contact Us"
        className="contact-us-gif"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          placeholder="Enter your message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          rows="5" 
          required 
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default ContactUs;
