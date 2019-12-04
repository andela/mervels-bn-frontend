/* eslint-disable no-param-reassign */
import { FEEDBACK_SUCCESS, FEEDBACK_ERROR } from './actionTypes';
import api from '../../config/axiosInstance';

const token = `Bearer ${localStorage.getItem('bareFootToken')}`;

export default (accommodation, feedback) => async(dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const response = await api.post(`api/v1/accommodations/${accommodation}/feedback`, feedback, config);

        dispatch({
            type: FEEDBACK_SUCCESS,
            message: response.data.message,
            error: ''
        });
    } catch(error) {
        dispatch({
            type: FEEDBACK_ERROR,
            data: {},
            error: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};
