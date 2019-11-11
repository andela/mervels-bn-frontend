/* eslint-disable func-names */
/* eslint-disable no-debugger */
import types from './actionTypes';
import * as notificationApi from '../../API/notificationApi';

export function loadNotificationSuccess(response) {
    return {
        type: types.NOTIFICATION_GET, data: response.data
    };
}

export function updateNotificationSuccess(data){
    return {
        type: types.NOTIFICATION_UPDATE, data
    };
}

export function getNotifications() {
    return async function (dispatch) {
        try {
            const response = await notificationApi.getNotifications();
            dispatch(loadNotificationSuccess(response));
        }
        catch (error) {
            console.log(error);
        }
    };
}

export function updateNotification(data){
    return async function(dispatch){
        dispatch(updateNotificationSuccess(data));
    };
}
