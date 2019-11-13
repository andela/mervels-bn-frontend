import { combineReducers } from 'redux';
import user from './signupReducer';
import reverifyData from './reverifyReducer';
import verifyData from './verifyReducer';

export default combineReducers({
    user,
    reverifyData,
    verifyData
});