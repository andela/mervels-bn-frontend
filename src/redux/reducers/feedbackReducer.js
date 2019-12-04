import {
    FEEDBACK_ERROR,
    FEEDBACK_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    message: '',
    error: ''
};

export default  (state = initialState, action) => {
    switch(action.type) {
        case FEEDBACK_SUCCESS:
            return { ...state, status:'feedback_success', message: action.message };
        case FEEDBACK_ERROR:
            return { ...state, status:'feedback_error', error: action.error };
        default:
            return state;
    }
};