/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toast } from "react-toastify";
import { FETCH_REQUEST_APPROVALS, FETCH_REQUEST_APPROVALS_FAILED } from './actionTypes';
import { baseURL } from "../../config/index";

const fetchSuccess = (payload) => ({
    type: FETCH_REQUEST_APPROVALS,
    payload,
});
const fetchFails = (error) => ({
    type: FETCH_REQUEST_APPROVALS_FAILED,
    error,
});

export const fetchRequestApprovals = () => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.get(`${baseURL}/requests/pending`, {
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
        dispatch(fetchFails(err.data));
    };
};