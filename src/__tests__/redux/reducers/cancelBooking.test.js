import cancelBooking from '../../../redux/reducers/cancelBookingReducer';
import {CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_ERROR} from '../../../redux/actions/actionTypes';

describe("booking reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull cancel of booking', () => {
        const response = cancelBooking(initialState, {
            type: CANCEL_BOOKING_SUCCESS,
            details: {status: 200, message: 'you have booked succesfully'}
        });

        expect(response).toEqual({
            data: {status: 200, message: 'you have booked succesfully'},
            error: null
        });
    });
    
    it('should test unsuccessful booking', () => {
        const response = cancelBooking(initialState, {
            type: CANCEL_BOOKING_ERROR,
            error: {message: 'some generic error'}
        });
        expect(response).toEqual({
            data: null, 
            error: {message: 'some generic error'}
        });
    }); 

}); 