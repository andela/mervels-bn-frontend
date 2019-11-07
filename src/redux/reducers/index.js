import { combineReducers } from 'redux';
import user from './signupReducer';
import reverifyData from './reverifyReducer';
import verifyData from './verifyReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    user,
    reverifyData,
    verifyData,
    profile: profileReducer
});