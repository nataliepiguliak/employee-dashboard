import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3517/api' // see the root .env file for the PORT number
})

export default apiClient
