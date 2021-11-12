import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>Journi</h2>

      <form className="login-form">
        <input
          type="text"
          name="username"
          id="username-field"
          className="login-form-field"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          id="password-field"
          class="login-form-field"
          placeholder="Password"
        />
        <input type="submit" value="Login" id="login-form-submit" />
      </form>
      <div className="container">
        <Link
          to="/register"
          className="register-link"
          style={{ textDecoration: "none" }}
        >
          Don't have account? Click here to register
        </Link>
      </div>
    </div>
  );
};

export default Login;
