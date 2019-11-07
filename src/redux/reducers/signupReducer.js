import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const signupReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGN_UP:
            console.log(">>>>>>>>", process.env.baseUrl);
            return {...state, user: {...state.user, data: action.userDetails}};
        default:
            return state;
    }
};

export default signupReducer;