import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const signupAction = ({userEmail, userPassword, firstName, lastName})=>(dispatch)=>{
    return userApi.signUp({userEmail, userPassword, firstName, lastName}).then((data) => {
        switch(data.status) {
            case 201:
                dispatch({type: actionTypes.SIGN_UP, userDetails: data.data.data});
                break;
            case 409:
                    dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status:409, message: "User already exist"}});
                    break;
            case 422:
                    dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status:422, message: data.message}});
                    break;
            default:
                dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status: 500, message: "Internal server error"}});
        }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
        dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status: null, message: "Connection error"}});
    });
};

export default signupAction;

