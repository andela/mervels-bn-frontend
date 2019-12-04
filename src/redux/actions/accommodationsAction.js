import API from '../../config/axiosInstance';
import { 
    GET_ACCOMMODATIONS_SUCCESS, 
    GET_ACCOMMODATIONS_FAILURE, 
    GET_ACCOMMODATION_SUCCESS, 
    GET_ACCOMMODATION_FAILURE,
    ADD_ACCOMMODATION_SUCCESS,
    ADD_ACCOMMODATION_FAILURE,
    ADD_ROOMS_SUCCESS,
    ADD_ROOMS_FAILURE
} from './actionTypes';

export const getAccommodations = (user) => async(dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.get('api/v1/accommodations', config);
        dispatch({
            type: GET_ACCOMMODATIONS_SUCCESS,
            payload: {
                accommodations: res.data.data,
                user
            }
        });
    } catch(error) {
        dispatch({
            type: GET_ACCOMMODATIONS_FAILURE,
            payload: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const getAccommodation = (id) => async(dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.get(`api/v1/accommodations/${id}`, config);
        dispatch({
            type: GET_ACCOMMODATION_SUCCESS,
            payload: res.data
        });
    } catch(error) {
        dispatch({
            type: GET_ACCOMMODATION_FAILURE,
            payload: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const createAccommodation = (payload) => async(dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.post(`api/v1/accommodations`, payload, config);
        dispatch({
            type: ADD_ACCOMMODATION_SUCCESS,
            payload: res.data
        });
    } catch(error) {
        dispatch({
            type: ADD_ACCOMMODATION_FAILURE,
            payload: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const createRooms= (payload) => async(dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.post(`api/v1/accommodations/rooms`, payload, config);
        dispatch({
            type: ADD_ROOMS_SUCCESS,
            payload: res.data
        });
    } catch(error) {
        dispatch({
            type: ADD_ROOMS_FAILURE,
            payload: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};