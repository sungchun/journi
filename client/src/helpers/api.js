import axios from 'axios'
import { getToken } from './auth'

export const login = async (data) => {
    return makeAxiosRequest('/login', data)
}

// const { data } = await axios.get('/api/posts')

const makeAxiosRequest = async (url, data) => {
    const config = getAxiosRequestConfig(url, data)
  
    const response = await axios(config)
    console.log(response.data)
    return response.data
  }
  
  export const getAxiosRequestConfig = (data, method = 'post') => {
    const config = {
      method,
      url: `/api/login`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      data,
    }
    return config
  }