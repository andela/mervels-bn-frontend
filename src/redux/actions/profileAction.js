/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { GET_PROFILE, GET_PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from './actionTypes';
import api from '../../config/axiosInstance';

const token = `Bearer ${localStorage.getItem('bareFootToken')}`;

export const getProfile = () => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const response = await api.get('api/v1/profile', config);
        const picture = await api.get('api/v1/profile/picture', config);

        if(response.data.data.userProfile === null) response.data.data.userProfile = {};

        Object.keys(response.data.data.userProfile).forEach(key=>{
            if(response.data.data.userProfile[key] === 'null') {
                response.data.data.userProfile[key] = '';
            }
        });

        const payload = { ...response.data.data, image: picture.data.data };

        dispatch({
            type: GET_PROFILE,
            data: payload,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: GET_PROFILE_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const updateProfile = (data) => async(dispatch) => {
    Object.keys(data).forEach(key=>{
        if(!data[key]) {
            delete data[key];
        }
    });
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await api.patch('api/v1/profile', data, config);
        const picture = await api.get('api/v1/profile/picture', config);

        if(response.data.data.userProfile === null) response.data.data.userProfile = {};

        Object.keys(response.data.data.userProfile).forEach(key=>{
            if(response.data.data.userProfile[key] === 'null') {
                response.data.data.userProfile[key] = '';
            }
        });

        const payload = { ...response.data.data, image: picture.data.data };

        dispatch({
            type: UPDATE_PROFILE,
            data: payload,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export const updateProfilePicture = (data) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const response = await api.get('api/v1/profile', config);
        const picture = await api.patch('api/v1/profile/picture', data, config);

        const payload = { ...response.data.data, image: picture.data.data };

        dispatch({
            type: UPDATE_PROFILE,
            data: payload,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};
