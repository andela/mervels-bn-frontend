/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseURL } from '../config/index';

const token = localStorage.getItem('bareFootToken');
export function addSuplier({userEmail, firstName, lastName}){
    // action can be approve or reject
    return axios.post(`${baseURL}api/v1/auth/add-user`, {
        userEmail, firstName, lastName
    }, { headers: {
        Authorization: `Bearer ${token}`
    },}).then((data) => data).catch((error) => {return error.response.data;});
};

