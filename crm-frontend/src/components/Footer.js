import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer footer-blink">
      <div className="footer-content">
        <p>©2024 Jeenia Gogoi. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/jeenia-gogoi-57b84a227/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin footer-blink"></i></a>
          <a href="https://x.com/JeeniaGogoi" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter footer-blink"></i></a>
          <a href="https://github.com/jeeniagogoi1" target="_blank" rel="noopener noreferrer"><i className="fab fa-github footer-blink"></i></a>
          <a href="https://drive.google.com/file/d/1-XvVdYG82bxfwSeu74HWBE-pT12CGo2O/view?usp=sharing" className="resume-link footer-blink" target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
