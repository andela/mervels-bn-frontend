import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const signupAction = ({userEmail, userPassword, firstName, lastName})=>(dispatch)=>{
    userApi.signUp({userEmail, userPassword, firstName, lastName}).then((data) => {
        switch(data.status) {
            case 200:
                dispatch({type: actionTypes.SIGN_UP, user: data.data});
                break;
            case 402:
                    dispatch({type: actionTypes.SIGN_UP_CONFLICT, error: {status:402, message: "User already exist"}});
                    break;
            default:
                dispatch({type: actionTypes.SIGN_UP_INTERNAL_ERROR, error: {status: 500, message: "Internal server error"}});
        }
    }).catch((error) => {
        dispatch({type: actionTypes.SIGN_UP_CONNECTION_ERROR, error: {status: null, message: error}});
    });
    dispatch({type: actionTypes.SIGN_UP, n: "userDetails"});
};

export default signupAction;