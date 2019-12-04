import {
    LIKE_ERROR,
    LIKE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    message: '',
    error: ''
};

export default  (state = initialState, action) => {
    switch(action.type) {
        case LIKE_SUCCESS:
            return { ...state, status:'like_success', message: action.message };
        case LIKE_ERROR:
            return { ...state, status:'like_error', error: action.error };
        default:
            return state;
    }
};