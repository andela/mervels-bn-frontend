import { FETCH_REQUEST_APPROVALS, FETCH_REQUEST_APPROVALS_FAILED } from '../actions/actionTypes';

const initialState = {
    approvals: {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_APPROVALS:
            return { ...state, approvals: action.payload };
        case FETCH_REQUEST_APPROVALS_FAILED:
                return { ...state, error: action.error };
        default:
            return state;
    }
};
