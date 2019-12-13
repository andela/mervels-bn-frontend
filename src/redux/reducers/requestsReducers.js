import moment from 'moment';
import { FETCH_REQUESTS, FETCH_REQUESTS_FAILED, FETCH_PENDING, FETCH_PAST } from '../actions/actionTypes';

const initialState = {
    "requests": {},
    filtered: {},
    title: "",
    error: null
};

export default (state = initialState, action) => {
    const { requests } = state; 
    let filtered;
    switch (action.type) {
        case FETCH_REQUESTS:
            return { ...state, requests: action.payload.data, title: action.payload.title, filtered: {}, error: null };
        case FETCH_PENDING:
            filtered = { ...requests, data:requests.data.filter((request) => request.status === 'Pending') };
            return { ...state, filtered, title: action.payload.title, error: null };
        case FETCH_PAST:
            filtered = { 
                ...requests, 
                data:requests.data.filter((request) => {
                    const len = request.travelDate.length;
                    return moment(request.travelDate[len-1]).isBefore();
                }) 
            };
            return { ...state, filtered, title: action.payload.title, error: null };
        case FETCH_REQUESTS_FAILED:
                return { ...state, error: action.error };
        default:
            return state;
    }
};
