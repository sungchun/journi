import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken } from "../helpers/auth";
import FormInput from "../components/FormInput";
import { login } from "../helpers/api";
import "../styles/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    login(data).then(handleSuccessfulLogin).catch(handleError);
  };

  const handleSuccessfulLogin = (data) => {
    setToken(data);
    setIsLoggedIn(true);
    setIsError(false);
    navigate("/");
  };

  const handleError = (error) => {
    if (error.response) {
      setIsError(true);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const formInputProps = { data, errorInfo, handleFormChange };

  return (
    <div>
      <section className="login">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Sign in to Journi</h1>
          <FormInput
            placeholder="Username"
            type="text"
            name="username"
            {...formInputProps}
          />
          <FormInput
            placeholder="password"
            type="password"
            name="password"
            {...formInputProps}
          />
          <div>
            <input type="submit" value="Login" className="submit button" />
          </div>
          <div className="container">
            <Link
              to="/register"
              className="register-link a"
              style={{ textDecoration: "none" }}
            >
              Don't have account? Click here to register
            </Link>
          </div>
          {isError ? (
            <div className="error">
              <p>Error. Please try again.</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </section>
    </div>
  );
};

export default Login;
