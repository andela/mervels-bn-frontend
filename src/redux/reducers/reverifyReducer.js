import actionTypes from '../actions/actionTypes';

const reverifyReducer = (state =  {data: null, error: null}, action) => {
    switch(action.type) {
        case actionTypes.REVERIFY_SUCCESS:
            return {...state, error: null, data: action.details};
        case actionTypes.REVERIFY_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default reverifyReducer;