import axios from 'axios'
import { getToken } from './auth'



export const fetchProfile = async (id) => {
  const page = id
  const config = {
    method: 'get',
    url: `/api/profile/${page}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },
  }
  const response = await axios(config)
  return response.data
}
export const fetchProfilePosts = async (id) => {
  const page = id
  const config = {
    method: 'get',
    url: `/api/profile/${page}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },
  }
  const response = await axios(config)
  return response.data.postSet
}

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

export const fetchProfileInfoImage = async () => {
  const config = {
    method: 'get',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },
  }
  const response = await axios(config)
  return response.data.profileImage
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
  console.log(response.data.postSet)
  return response.data.postSet
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

export const updateProfileInformationImage = async (image) => {
  console.log('this is my bio',image)
  const config = {
    method: 'put',
    url: `/api/profile`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'content-Type': 'application/json'
    },
    "data": JSON.stringify({
      "profileImage": image
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

export const postTrip = async (data) => {
  return makeAxiosRequest('/posts', data)
}

export const makeAxiosRequest = async (url, data, method = 'post') => {
  const config = getAxiosRequestConfig(url, data, method)
  const response = await axios(config)
  return response.data
}
  
export const getAxiosRequestConfig = (requestUrl, data, method) => {
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
