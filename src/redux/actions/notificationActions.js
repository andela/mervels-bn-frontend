/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-debugger */
import { NOTIFICATION_READALL, NOTIFICATION_GET, NOTIFICATION_UPDATE, NOTIFICATION_READONE} from './actionTypes';
import api, { config } from '../../config/axiosInstance';
import { handleError } from './errorActions';

export function loadNotificationSuccess(response) {
    return {
        type: NOTIFICATION_GET, data: response.data
    };
}

export function updateNotificationSuccess(data){
    return {
        type: NOTIFICATION_UPDATE, data
    };
}

export function markReadAllSuccess(){
    return{
        type: NOTIFICATION_READALL
    };
}

export function markOneReadSuccess(notificationId){
    return{
        type: NOTIFICATION_READONE, data: notificationId
    };
}

export function getNotifications() {
    return async function (dispatch) {
        try {
            const response = await api.get(`/api/v1/notifications`, config);
            dispatch(loadNotificationSuccess(response));
        }
        catch (error) {
            dispatch(handleError(error));
        }
    };
}
export function markReadAll() {
    return async function (dispatch) {
        try {
            const response = await api.patch(`/api/v1/notifications/mark-as-read`, null, config);
            dispatch(markReadAllSuccess());
        }
        catch (error) {
            dispatch(handleError(error));
        }
    };
}
export function markOneAsRead(notificationId) {
    return async function (dispatch) {
        try {
            debugger;
            const response = await api.patch(`/api/v1/notifications/mark-as-read?id=${notificationId}`, null, config);
            dispatch(markOneReadSuccess(notificationId));
        }
        catch (error) {
            dispatch(handleError(error));
        }
    };
}

export function updateNotification(data){
    return async function(dispatch){
        dispatch(updateNotificationSuccess(data));
    };
}


