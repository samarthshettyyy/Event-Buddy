import React from "react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import "./Footer.css"; // Import your custom CSS styles
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="https://flowbite.com" className="footer-logo">
            <img src={logo} alt="Flowbite Logo" />
            Event Buddy
          </a>
        </div>
        <div className="footer-links">
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">Github</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <span>© EventBuddy™ 2022</span>
        <div className="social-icons">
          <a href="#"><BsFacebook /></a>
          <a href="#"><BsInstagram /></a>
          <a href="#"><BsTwitter /></a>
          <a href="#"><BsGithub /></a>
          <a href="#"><BsDribbble /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
