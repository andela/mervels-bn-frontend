/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseURL } from '../config/index';

export function signUp(userDetails){
    return axios.post(`${baseURL}/api/v1/auth/signup`, userDetails).then((data) => data).catch((error) => {return error.response.data;});
};

export function reverify(userEmail) {
    return axios.post(`${baseURL}/api/v1/auth/createLink`, userEmail).then((data) => data).catch((error) => {return error.response.data;});
};

export function verify(token) {
    return axios.patch(`${baseURL}/api/v1/auth/verify/?token=${token}`).then((data) => data).catch((error) => { return {status: error.response.status};});
};
