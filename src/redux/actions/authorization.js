/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from './actionTypes';
import API from '../../config/axiosInstance';

export const checkUser = () => async (dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.get('api/v1/auth/check-user', config);
        dispatch({
            type: AUTHORIZATION_SUCCESS,
            payload: {
                user: res.data.data
            }
        });
    } catch(error) {
        dispatch({
            type: AUTHORIZATION_ERROR,
            payload: (error.response) ? error.response.data : {status: 500, message: 'Server error'}
        });
    }
};
