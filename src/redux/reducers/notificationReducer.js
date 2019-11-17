/* eslint-disable no-debugger */
import initialState from "./initialState";
import types from '../actions/actionTypes';

export default function notificaitonReducer(state = initialState.notifications, actions) {
    if(actions.type === types.NOTIFICATION_GET){
        return {...state, notifications:actions.data.data.notifications, unread: actions.data.data.unread};
    }if (actions.type === types.NOTIFICATION_UPDATE){
        const unread  = state.unread + 1;
        const {notifications} = state;
        notifications.push(actions.data);
        return {...state, unread, notifications };
    }
        return state;
}