import roomsReducer from '../../../redux/reducers/roomsReducer';
import {GET_ROOMS_SUCCESS, GET_ROOMS_ERROR} from '../../../redux/actions/actionTypes';

describe("rooms reducer", () => {
    const initialState = {data: [], error: null};
    it('should test successfull getting rooms', () => {
        const response = roomsReducer(initialState, {
            type: GET_ROOMS_SUCCESS,
            payload: {data: [{room1: 1, room2: 2, room3: 3}]}
        });

        expect(response).toEqual({
            data: [{room1: 1, room2: 2, room3: 3}],
            error: null
        });
    });
    
    it('should test unsuccessful getting rooms', () => {
        const response = roomsReducer(initialState, {
            type: GET_ROOMS_ERROR,
            payload: {message: 'some generic error'}
        });
        expect(response).toEqual({
            data: [], 
            error: {message: 'some generic error'}
        });
    });  
}); 