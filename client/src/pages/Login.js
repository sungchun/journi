import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { setToken } from "../helpers/auth";
import FormInput from "../components/FormInput";
import { login } from '../helpers/api'


const Login = ({ setIsLoggedIn }) => {

  const [data, setData] = useState({
    username: '',
    password: '',
  })
  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    login(data)
      .then(console.log(data), handleSuccessfulLogin)
      .catch(handleError)


  }

  const handleSuccessfulLogin = ({ token }) => {
    
    setToken(token)
    console.log({token})
    setIsLoggedIn(true)
    setIsError(false)

    navigate.push('/home')
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <div>
      <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign in to Journi</h1>
        <FormInput
          placeholder='Username'
          type='text'
          name='username'
          {...formInputProps}
        />
        <FormInput
          placeholder='password'
          type='password'
          name='password'
          {...formInputProps}
        />
        <div>
          <input type='submit' value='Login' />
        </div>
        <div className="container">
        <Link
          to="/register"
          className="register-link"
          style={{ textDecoration: "none" }}
        >
          Don't have account? Click here to register
        </Link>
      </div>
        {isError ? (
          <div className='error'>
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
