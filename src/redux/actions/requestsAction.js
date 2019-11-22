/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toast } from "react-toastify";
import { FETCH_REQUESTS, FETCH_REQUESTS_FAILED, FETCH_PENDING, FETCH_PAST } from './actionTypes';
import API  from '../../config/axiosInstance';

import { baseURL } from '../../config/index';

const baseUrl = baseURL ;
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
        const response = await axios.get(`${baseUrl}api/v1/requests/my-requests`, {
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    });
        const { data } = response;
        dispatch(fetchSuccess({ data, title: 'ALL REQUESTS' }));
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

export const getPending = () => ({
    type: FETCH_PENDING,
    payload: {
        title: 'PENDING REQUESTS'
    },
});

export const getPast = () => ({
    type: FETCH_PAST,
    payload: {
        title: 'PAST REQUESTS'
    },
});

export const searchRequests = (parameter, query) => async (dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
      const res = await API.get(`api/v1/search/requests?${parameter}=${query}`, config);
      dispatch(fetchSuccess({ data: res.data }));
    }
    catch (error) {
        let err = error.response;
        if (err === undefined) {
            err = {
                data:{
                    message: error.message
                }
            };
        }
        dispatch(fetchFail(err.data));
    }
  };
