/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import {
    FETCH_LOCATIONS,
    FETCH_LOCATIONS_ERROR,
    REQUEST_TRIP_SUCCESS,
    REQUEST_TRIP_ERROR,
    FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_ERROR,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR
} from './actionTypes';
import api from '../../config/axiosInstance';

const token = `Bearer ${localStorage.getItem('bareFootToken')}`;

export const getLocations = () => async(dispatch) => {
    try {
        const response = await api.get('/api/v1/locations');

        dispatch({
            type: FETCH_LOCATIONS,
            data: response.data.data,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: FETCH_LOCATIONS_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const requestTrip = (data) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await api.post(`/api/v1/requests/${data.type}`, data.data, config);
        if(data.toggleAutofill) await api.patch('api/v1/auth/autofill-preference', {}, config);
        dispatch({
            type: REQUEST_TRIP_SUCCESS,
            message: response.data.message,
            id: response.data.data.id,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: REQUEST_TRIP_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const getSingleRequest = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await api.get(`/api/v1/requests/${id}`, config);
        dispatch({
            type: FETCH_REQUEST_SUCCESS,
            data: response.data.data,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: FETCH_REQUEST_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const updateRequest = (data) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await api.put(`/api/v1/requests/${data.id}`, data.data, config);
        dispatch({
            type: UPDATE_REQUEST_SUCCESS,
            message: response.data.message,
            id: response.data.data.id,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: UPDATE_REQUEST_ERROR,
            data: {},
            id: data.id,
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const deleteRequest = (id) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await api.delete(`/api/v1/requests/${id}`, config);
        dispatch({
            type: DELETE_REQUEST_SUCCESS,
            message: response.data.message,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: DELETE_REQUEST_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};