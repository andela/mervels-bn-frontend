import bookingReducer from '../../../redux/reducers/bookingReducer';
import {BOOKING_SUCCESS, BOOKING_ERROR} from '../../../redux/actions/actionTypes';

describe("booking reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull booking', () => {
        const response = bookingReducer(initialState, {
            type: BOOKING_SUCCESS,
            details: {status: 200, message: 'you have booked succesfully'}
        });

        expect(response).toEqual({
            data: {status: 200, message: 'you have booked succesfully'},
            error: null
        });
    });
    
    it('should test unsuccessful booking', () => {
        const response = bookingReducer(initialState, {
            type: BOOKING_ERROR,
            error: {message: 'some generic error'}
        });
        expect(response).toEqual({
            data: null, 
            error: {message: 'some generic error'}
        });
    }); 

    it('should test no action', () => {
        const response = bookingReducer(initialState, {
            type: 'no action',
            error: {message: 'some generic error'}
        });
        expect(response).toEqual({
            data: null, 
            error: null
        });
    }); 
}); 