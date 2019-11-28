/* eslint-disable import/prefer-default-export */
import API from '../../config/axiosInstance';
import { 
GET_ROOMS_SUCCESS, GET_ROOMS_ERROR
} from './actionTypes';

const getRooms = () => async(dispatch) => {
    try {
        const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const res = await API.get('api/v1/rooms', config);
        dispatch({
            type: GET_ROOMS_SUCCESS,
            payload: {
                data: res.data.data
            }
        });
    } catch(error) {
        dispatch({
            type: GET_ROOMS_ERROR,
            payload: (error.response) ? error.response.data.message : 'Server error'
        });
    }
};

export default getRooms;