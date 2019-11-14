import requestReducer from '../../../redux/reducers/requestReducer';
import {
    FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_ERROR,
    FETCH_LOCATIONS,
    FETCH_LOCATIONS_ERROR,
    REQUEST_TRIP_SUCCESS,
    REQUEST_TRIP_ERROR,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR,
} from '../../../redux/actions/actionTypes';

const initialState = {
    status: '',
    locations: '',
    message: '',
    error: ''
};

describe('Request Reducer', () => {
    it('should test successful request retrieval', () => {
        const response = requestReducer(initialState, {
            type: FETCH_REQUEST_SUCCESS,
            data: {}
        });
        expect(response.status).toEqual('fetch_request_success');
    });

    it('should test unsuccessful request retrieval', () => {
        const response = requestReducer(initialState, {
            type: FETCH_REQUEST_ERROR,
            error: ''
        });
        expect(response.status).toEqual('fetch_request_error');
    });

    it('should test successful locations retrieval', () => {
        const response = requestReducer(initialState, {
            type: FETCH_LOCATIONS,
            locations: []
        });
        expect(response.status).toEqual('fetch_locations_success');
    });

    it('should test unsuccessful locations retrieval', () => {
        const response = requestReducer(initialState, {
            type: FETCH_LOCATIONS_ERROR,
            error: ''
        });
        expect(response.status).toEqual('fetch_locations_error');
    });

    it('should test successful trip request', () => {
        const response = requestReducer(initialState, {
            type: REQUEST_TRIP_SUCCESS,
            message: '',
            id: ''
        });
        expect(response.status).toEqual('request_success');
    });

    it('should test unsuccessful trip request', () => {
        const response = requestReducer(initialState, {
            type: REQUEST_TRIP_ERROR,
            error: ''
        });
        expect(response.status).toEqual('request_error');
    });

    it('should test successful trip request update', () => {
        const response = requestReducer(initialState, {
            type: UPDATE_REQUEST_SUCCESS,
            message: '',
            id: ''
        });
        expect(response.status).toEqual('update_request_success');
    });

    it('should test unsuccessful trip request update', () => {
        const response = requestReducer(initialState, {
            type: UPDATE_REQUEST_ERROR,
            error: '',
            id: ''
        });
        expect(response.status).toEqual('update_request_error');
    });

    it('should test successful trip request delete', () => {
        const response = requestReducer(initialState, {
            type: DELETE_REQUEST_SUCCESS,
            message: ''
        });
        expect(response.status).toEqual('delete_request_success');
    });

    it('should test unsuccessful trip request delete', () => {
        const response = requestReducer(initialState, {
            type: DELETE_REQUEST_ERROR,
            error: ''
        });
        expect(response.status).toEqual('delete_request_error');
    });
});
