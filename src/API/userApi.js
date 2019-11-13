/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const { baseUrl } = process.env;

export function signUp(userDetails){
    return axios.post(`${baseUrl}/api/v1/auth/signup`, userDetails).then((data) => data).catch((error) => {return error.response.data;});
};

export function reverify(userEmail) {
    return axios.post(`${baseUrl}/api/v1/auth/createLink`, userEmail).then((data) => data).catch((error) => {return error.response.data;});
};

export function verify(token) {
    return axios.patch(`${baseUrl}/api/v1/auth/verify/?token=${token}`).then((data) => data).catch((error) => { return {status: error.response.status};});
};
