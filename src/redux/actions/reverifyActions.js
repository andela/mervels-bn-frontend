/* eslint-disable import/no-unresolved */
import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const reverify = ({userEmail}) => async (dispatch) => {
    return userApi.reverify({userEmail}).then((data) => {
        switch(data.status) {
            case 200:
                dispatch({type: actionTypes.REVERIFY_SUCCESS, details: {status: 200, message: userEmail}});
                break;
            default:
                dispatch({type: actionTypes.REVERIFY_ERROR, error: {status: data.status, message: data.message}});
        }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
        dispatch({type: actionTypes.REVERIFY_ERROR, error: {status: 501, message: 'Connection error'}});
       });
};
export default reverify;