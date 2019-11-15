/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseURL } from '../config/index';

const token = localStorage.getItem('bareFootToken');
export function approveReject(action, requestId, reason){
    // action can be approve or reject
    return axios.patch(`${baseURL}api/v1/requests/${action}/${requestId}`, {
            reason
    }, { headers: {
        Authorization: `Bearer ${token}`
    },}).then((data) => data).catch((error) => {return error.response.data;});
};

export function getRequest(requestId) {
    return axios.get(`${baseURL}api/v1/requests/${requestId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((data) => data).catch((error) => {return error.response.data;});;
}
