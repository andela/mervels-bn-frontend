import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const verify = (token) => (dispatch) => {
    return userApi.verify(token).then((data) => {
        switch(data.status) {
            case 201:
                dispatch({type: actionTypes.VERIFY_SUCCESS, details: {status: 201, message: data.data.data}});
                break;
            case 401:
                dispatch({type: actionTypes.VERIFY_ERROR, error: {status: 401, message: 'Verification Link expired'}});
                break;
            case 409:
                dispatch({type: actionTypes.VERIFY_ERROR, error: {status: 409, message: 'User already verified'}});
                break;
            default:
                dispatch({type: actionTypes.VERIFY_ERROR, error: {status: 500, message: 'Server error'}});
        }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
        dispatch({type: actionTypes.VERIFY_ERROR, error: {status: 501, message: 'Connection error'}});
    });
};
export default verify;