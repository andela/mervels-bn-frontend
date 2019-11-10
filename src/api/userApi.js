import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mervels-bn-backend-staging.herokuapp.com/api/v1'
});
export default API;