import getRequestReducer from '../../../redux/reducers/SingleRequestReducer';
import {GET_REQUEST_SUCCESS, GET_REQUEST_ERROR} from '../../../redux/actions/actionTypes';

describe("get request reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull get request', () => {
        const response = getRequestReducer(initialState, {
            type: GET_REQUEST_SUCCESS,
            details: {message: 'got request successfully'}
        });

        expect(response).toEqual({
            data: {message: 'got request successfully'},
            error: null
        });
    });
    
    it('should test unsuccessful get request', () => {
        const response = getRequestReducer(initialState, {
            type: GET_REQUEST_ERROR,
            error: {error: 'error fetching request'}
        });
        expect(response).toEqual({ 
            data: null, 
            error: {error: 'error fetching request'}
        }); 
    }); 
}); 