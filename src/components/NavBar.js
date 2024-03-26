import React from "react";
import "../styles/NavBar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Calendar</h1>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
