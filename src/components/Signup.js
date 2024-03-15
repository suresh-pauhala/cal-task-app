// Signup.js
import React from "react";
import "../styles/AuthForms.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-heading">
        <h2>Sign Up</h2>
      </div>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" name="fullname" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
