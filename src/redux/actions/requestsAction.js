/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toast } from "react-toastify";
import { FETCH_REQUESTS, FETCH_REQUESTS_FAILED } from './actionType';

const baseUrl ='https://mervels-bn-backend-staging.herokuapp.com';
const fetchSuccess = (payload) => ({
    type: FETCH_REQUESTS,
    payload,
});
const fetchFail = (error) => ({
    type: FETCH_REQUESTS_FAILED,
    error,
});

export const fetchRequests = () => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.get(`${baseUrl}/api/v1/requests/my-requests`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    });
        const { data } = response;
        toast.success(data.message, {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        dispatch(fetchSuccess(data));
    }catch (error) {
        let err = error.response;
        if (err === undefined) {
            err = {
                data:{
                    message: error.message
                }
            };
        }
        toast.error(err.data.status === 401 ? "You were logged out" :err.data.message, {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        dispatch(fetchFail(err.data));
    };
};