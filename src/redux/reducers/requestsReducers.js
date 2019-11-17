import { FETCH_REQUESTS, FETCH_REQUESTS_FAILED } from '../actions/actionType';

const initialState = {
    "requests": {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUESTS:
            return { ...state, requests: action.payload };
        case FETCH_REQUESTS_FAILED:
                return { ...state, error: action.error };
        default:
            return state;
    }
};
