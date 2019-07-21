import axios from 'axios'
const baseDomain = 'https://cols-project.herokuapp.com/cols/api'
const baseURL = `${baseDomain}`

export default axios.create({
    baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Content-Type': 'application/json'
    }
  })
  