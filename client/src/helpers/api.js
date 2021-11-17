import axios from 'axios'
import { getToken } from './auth'


export const fetchProfileInfo = async () => {
  const config = {
    method: 'get',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },

  }
  const response = await axios(config)
  return response.data
}
export const fetchProfileInfoBio = async () => {
  const config = {
    method: 'get',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },

  }
  const response = await axios(config)
  return response.data.profileBio
}
export const fetchProfileInfoTrips = async () => {
  const config = {
    method: 'get',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },

  }
  const response = await axios(config)
  return response.data.trips
}

export const updateProfileInformation = async (bio) => {
  console.log('this is my bio',bio)
  const config = {
    method: 'put',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },
    "data": JSON.stringify({
      "profileBio": bio
    }),
  }
  const response = await axios(config)
  return response.data
}

export const login = async (data) => {
    return makeAxiosRequest('/login', data)
}
export const register = async (data) => {
    return makeAxiosRequest('/register', data)
}


const makeAxiosRequest = async (url, data) => {
    const config = getAxiosRequestConfig(url, data)
    const response = await axios(config)
    return response.data
  }
  
  export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
    const config = {
      method,
      url: `/api/${requestUrl}`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      data,
    }
    return config
  }