/* eslint-disable dot-notation */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const { baseUrl } = process.env;

export function getNotifications(){
    const token = localStorage.getItem('logged_in');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${baseUrl}/api/v1/notifications`).then((data) => data).catch((error) => {throw error;});
};

