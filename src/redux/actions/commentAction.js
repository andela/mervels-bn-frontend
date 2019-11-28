/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { toast } from "react-toastify";
import {
    GET_COMMENTS,
    GET_COMMENTS_FAILED,
    POST_COMMENTS,
    POST_COMMENTS_FAILED,
    DELETE_COMMENTS,
    DELETE_COMMENTS_FAILED
} from './actionTypes';
import { baseURL } from '../../config/index';

const Success = (payload, actionType) => ({
    type: actionType,
    payload,
});
const Fail = (error, actionType) => ({
    type: actionType,
    error,
});

export const getComment = (id) => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.get(`${baseURL}api/v1/requests/${id}/comments`,{
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        },
    });
        const { data } = response;
        dispatch(Success(data, GET_COMMENTS));
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
        dispatch(Fail(err.data, GET_COMMENTS_FAILED));
    };
};

export const postComment = (id, comment) => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.post(`${baseURL}api/v1/requests/${id}/comment`,comment,{
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
          data.data.User = data.data.user;
          delete data.data.user;
        dispatch(Success(data, POST_COMMENTS));
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
        dispatch(Fail(err.data, POST_COMMENTS_FAILED));
    };
};

export const deleteComment = (id) => async (dispatch) => {
    try{
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const response = await axios.delete(`${baseURL}api/v1/requests/comments/${id}`,{
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
          const newData ={...data, id};
        dispatch(Success(newData, DELETE_COMMENTS));
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
        dispatch(Fail(err.data, DELETE_COMMENTS_FAILED));
    };
};

