/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseURL } from '../config/index';

const token = localStorage.getItem('bareFootToken');
export function bookRoomApi({bookDetails, requestId}){
    // action can be approve or reject
    return axios.post(`${baseURL}api/v1/booking/${requestId}`, {booking: bookDetails}, {
        headers: {
        Authorization: `Bearer ${token}`
    },}).then((data) => data).catch((error) => {return error.response.data;});
};

export function cancelBooking(requestId){
    // action can be approve or reject
    return axios.post(`${baseURL}api/v1/booking/cancel/${requestId}`, {}, {
        headers: {
        Authorization: `Bearer ${token}`
    },}).then((data) => data).catch((error) => {return error.response.data;});
};