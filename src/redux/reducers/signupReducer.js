import actionTypes from '../actions/actionTypes';

const signupReducer = (state =  {data: null, error: null}, action) => {
    switch(action.type) {
        case actionTypes.SIGN_UP:
            return {...state, error: null, data: action.userDetails};
        case actionTypes.SIGN_UP_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default signupReducer;