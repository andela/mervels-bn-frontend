import actionTypes from '../actions/actionTypes';

const verifyReducer = (state =  {data: null, error: null}, action) => {
    switch(action.type) {
        case actionTypes.VERIFY_SUCCESS:
            return {...state, error: null, data: action.details.message};
        case actionTypes.VERIFY_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default verifyReducer;