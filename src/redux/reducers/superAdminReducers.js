import { ASSIGN_SUCCESS, ASSIGN_FAILED } from '../actions/actionTypes';

const initialState = {
    userRoles: {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ASSIGN_SUCCESS:
            return { ...state, userRoles: action.payload };
        case ASSIGN_FAILED:
                return { ...state, error: action.error };
        default:
            return state;
    }
};
