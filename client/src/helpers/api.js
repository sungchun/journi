import axios from 'axios'
import { getToken } from './auth'

export const login = async (data) => {
    return makeAxiosRequest('/login', data)
}
export const register = async (data) => {
    return makeAxiosRequest('/register', data)
}

// const { data } = await axios.get('/api/posts')

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