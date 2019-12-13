/* eslint-disable no-unused-vars */
import  {CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_ERROR} from './actionTypes';
import {cancelBooking} from '../../API/bookingApi';

const cancelBookingAction = (requestId) => async (dispatch) => {
    return cancelBooking(requestId)
    .then((data) => {
        switch(data.status){
            case 200:
                dispatch({type: CANCEL_BOOKING_SUCCESS, details: {status: 201, message: 'Booking cancelled successfully'}});
                break;
            default:
                dispatch({type: CANCEL_BOOKING_ERROR, error: {status: data.status || 500, message: data.message}});
        }

    }).catch((error) => {
        dispatch({
            type: CANCEL_BOOKING_ERROR,
            details: {status: 501, message: 'connection error. Try again'}
        });
    });
};

export default cancelBookingAction; 