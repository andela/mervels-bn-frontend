/* eslint-disable no-param-reassign */
import { LIKE_SUCCESS, LIKE_ERROR } from './actionTypes';
import api from '../../config/axiosInstance';

const token = `Bearer ${localStorage.getItem('bareFootToken')}`;

export default (accommodation) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const response = await api.patch(`api/v1/accommodations/${accommodation}/like`, {}, config);
        dispatch({
            type: LIKE_SUCCESS,
            message: response.data.message,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: LIKE_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};
