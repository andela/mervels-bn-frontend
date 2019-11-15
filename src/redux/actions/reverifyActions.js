/* eslint-disable import/no-unresolved */
import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const reverify = ({userEmail}) => (dispatch) => {
    return userApi.reverify({userEmail}).then((data) => {
        switch(data.status) {
            case 200:
                dispatch({type: actionTypes.REVERIFY_SUCCESS, details: {status: 200, message: userEmail}});
                break;
            case 401:
                dispatch({type: actionTypes.REVERIFY_ERROR, error: {status: 401, message: 'Error occured, try again'}});
                break;
            case 404:
                dispatch({type: actionTypes.REVERIFY_ERROR, error: {status: 404, message: 'User not found'}});
                break;
            default:
                dispatch({type: actionTypes.REVERIFY_ERROR, error: {status: 500, message: 'Server error'}});
        }
    // eslint-disable-next-line no-unused-vars
    });
};
export default reverify;