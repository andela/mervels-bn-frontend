import { combineReducers } from 'redux';
import user from './signupReducer';
import notification from './notificationReducer';

export default combineReducers({
    user,
    notification
});