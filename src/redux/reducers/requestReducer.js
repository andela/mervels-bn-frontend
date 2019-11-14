import {
    FETCH_LOCATIONS,
    FETCH_LOCATIONS_ERROR,
    REQUEST_TRIP_SUCCESS,
    REQUEST_TRIP_ERROR,
    FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_ERROR,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR
} from '../actions/actionTypes';

const initialState = {
    status: '',
    locations: '',
    message: '',
    error: ''
};

export default  (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOCATIONS:
            return { ...state, status:'fetch_locations_success', locations: action.data };
        case FETCH_LOCATIONS_ERROR:
            return { ...state, status:'fetch_locations_error', error: action.error };
        case REQUEST_TRIP_SUCCESS:
            return { ...state, status: 'request_success' , message: action.message, id: action.id };
        case REQUEST_TRIP_ERROR:
            return { ...state, status: 'request_error' , error: action.error };
        case FETCH_REQUEST_SUCCESS:
            return { ...state, status: 'fetch_request_success', data: action.data };
        case FETCH_REQUEST_ERROR:
            return { ...state, status: 'fetch_request_error', error: action.error };
        case UPDATE_REQUEST_SUCCESS:
            return { ...state, status: 'update_request_success' , message: action.message, id: action.id };
        case UPDATE_REQUEST_ERROR:
            return { ...state, status: 'update_request_error' , error: action.error, id: action.id };
        case DELETE_REQUEST_SUCCESS:
            return { ...state, status: 'delete_request_success' , message: action.message };
        case DELETE_REQUEST_ERROR:
            return { ...state, status: 'delete_request_error' , error: action.error };
        default:
            return state;
    }
};