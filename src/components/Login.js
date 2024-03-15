// Login.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/AuthForms.css";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-heading">
        <h2>Login</h2>
      </div>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
