import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { register } from '../helpers/api'
import FormInput from '../components/FormInput'


const Register = () => {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  

  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('hello')
    register(data)
      .then(handleSuccessfulRegister)
      .catch(handleError)
  }

  const handleSuccessfulRegister = () => {
    setIsError(false)
    navigate('/login')
  }

  const handleError = (error) => {
    if (error.response) {
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

  const formInputProps = { data, handleFormChange }

  return (
    <div>
      <h2>Journi</h2>
      <section>
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder='username'
          type='text'
          name='username'
          {...formInputProps}
        />
        <FormInput
          placeholder='email'
          type='email'
          name='email'
          {...formInputProps}
        />
        <FormInput
          placeholder='password'
          type='password'
          name='password'
          {...formInputProps}
        />
        <FormInput
          placeholder='Confirm Password'
          type='password'
          name='passwordConfirmation'
          {...formInputProps}
        />
        <div>
          <input type='submit' value='Register' />
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
