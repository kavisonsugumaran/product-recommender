import axios from 'axios';

// Create a new Axios instance with the base URL
const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});

export default instance;
