/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-debugger */
import * as userApi from '../../API/userApi';
import * as types from './actionTypes';
import api from '../../config/axiosInstance';

import { handleError } from "./errorActions";

export function resetPasswordSent(response) {
    return {
        type: types.RESET_PASSWORD_SENT, message: response.message
    };
}

export function passwordResetSuccess(response) {
    return {
        type: types.PASSWORD_RESET_SUCCESS, message: response
    };
}

export const sendResetPassword = (email) => async(dispatch) => {
    try{
        const response = await api.post(`api/v1/auth/forgotPassword`, email);
        dispatch(resetPasswordSent(response.data));
    }catch(error){

        dispatch(handleError(error));
    }
};

export const resetPassword = (data) => async(dispatch) =>{
    try{
        const {userId , userToken, password, newPassword } = data;
        const url = `/api/v1/auth/resetPassword/${userId}/${userToken}`;
        const response = await api.put(url, {password, newPassword });

        dispatch(resetPasswordSent(response.data));
    }catch(error){
        dispatch(handleError(error));
    }
};
