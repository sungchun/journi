import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h2>Journi</h2>
      <form className="register-form">
        <input
          type="text"
          name="username"
          id="username-field"
          className="register-form-field"
          placeholder="Enter Username"
        />
        <input
          type="email"
          name="email"
          id="email-field"
          className="register-form-field"
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          id="password-field"
          className="register-form-field"
          placeholder="Enter your password"
        />
        <input
          type="password"
          name="password"
          id="password-field-confirmation"
          className="register-form-field"
          placeholder="Confirm Password"
        />
        <input type="submit" value="register" id="register-form-submit" />
      </form>
      <div className="container">
        <Link
          to="/login"
          className="login-link"
          style={{ textDecoration: "none" }}
        >
          Have an account? Click here to login!
        </Link>
      </div>
    </div>
  );
};

export default Register;
