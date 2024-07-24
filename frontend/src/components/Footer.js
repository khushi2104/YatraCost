// Footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 YatraCost. All rights reserved.</p>
        <p>
         
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i class='bx bxl-facebook-circle'></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> <i class='bx bxl-twitter' ></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i class='bx bxl-instagram-alt' ></i></a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
