/* eslint-disable no-debugger */
import initialState from "./initialState";
import types from '../actions/actionTypes';

export default function notificaitonReducer(state = initialState.notifications, actions) {
    if(actions.type === types.NOTIFICATION_GET){
        return {...state, ...actions.data.data};
    }if (actions.type === types.NOTIFICATION_UPDATE){
        console.log(actions);
        const unread  = state.unread + 1;
        const {notifications} = state;
        notifications.push(actions.data);
        return {...state, unread, notifications };
    }
        return state;
}