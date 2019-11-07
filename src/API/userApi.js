/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const { baseUrl } = process.env;

export function signUp(userDetails){
    console.log("called>>>>>>>>>>>");
    return axios.post(`${baseUrl}/api/v1/auth/signup`, userDetails).then((data) => data).catch((error) => {throw error;});
};

