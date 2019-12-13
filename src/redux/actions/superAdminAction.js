/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { toast } from "react-toastify";
import { ASSIGN_SUCCESS, ASSIGN_FAILED } from './actionTypes';
import { baseURL } from '../../config/index';

const postSuccess = (payload) => ({
    type: ASSIGN_SUCCESS,
    payload,
});
const postFail = (error) => ({
    type: ASSIGN_FAILED,
    error,
});

export const assignUser = (userInfo) => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.put(`${baseURL}api/v1/auth/updateRole`,userInfo,{
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
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
        dispatch(postSuccess(data));
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
        dispatch(postFail(err.data));
    };
};