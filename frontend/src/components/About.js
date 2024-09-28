import React from "react";
import "./About.css"; // Import your CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">About Event Buddy</div>
      <div className="about-content">
        <p>
          Event Buddy is a collaborative event planning & execution platform designed to streamline the process of organizing events of all sizes.
        </p>
        <ul>
          <li>Seamless collaboration with co-organizers</li>
          <li>Comprehensive guest list management</li>
          <li>Integrated budgeting tools</li>
          <li>Interactive timeline creation</li>
          <li>Real-time updates and notifications</li>
        </ul>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="container">
      {/* Left Column */}
      <div className="left-column">
        {/* You can place other components here, like the chatbot */}
      </div>

      {/* Right Column */}
      <div className="right-column">
        <About />
      </div>
    </div>
  );
};

export default Layout;
