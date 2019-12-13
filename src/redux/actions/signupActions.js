import actionTypes from './actionTypes';
import * as userApi from '../../API/userApi';

const signupAction = ({userEmail, userPassword, firstName, lastName})=> async (dispatch)=>{
    return userApi.signUp({userEmail, userPassword, firstName, lastName})
        .then((data) => {
            switch(data.status) {
                case 201:
                    dispatch({type: actionTypes.SIGN_UP, userDetails: data.data.data});
                    break;
                default:
                    dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status: data.status, message: data.message}});
        }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
        dispatch({type: actionTypes.SIGN_UP_ERROR, error: {status: 501, message: 'Connection error'}});
       });
};

export default signupAction;

