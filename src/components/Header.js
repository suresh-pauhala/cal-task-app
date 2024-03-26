import React from "react";
import headerImg from "../assets/calendar.jpg";

const Header = ({ scrollToMain }) => {
  return (
    <header>
      <div className="header-content">
        <p>Modern Calendar App</p>A beautiful and intuitive way to organize your
        schedule. Effortlessly Manage Your Schedule with Our Intuitive Calendar
        <button className="header-button" onClick={scrollToMain}>
          Explore
        </button>
      </div>
      <img
        src={headerImg}
        style={{ width: "55%", height: "500px" }}
        alt="img"
      />
    </header>
  );
};

export default Header;
