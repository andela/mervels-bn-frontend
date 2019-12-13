/* eslint-disable no-unused-vars */
import {BOOKING_SUCCESS, BOOKING_ERROR} from './actionTypes';
import {bookRoomApi} from '../../API/bookingApi';
 
const bookRoomAction = (bookDetails, requestId) => async (dispatch) => {
    // book details is an array of booking details according to whether single trip or multi city.
    return bookRoomApi({bookDetails, requestId})
    .then((data) => {
        switch(data.status){
            case 200:
                dispatch({type: BOOKING_SUCCESS, details: {status: 200, message: data.data.message}});
                break;
            default:
                dispatch({type: BOOKING_ERROR, error: {status: data.status || 500, message: data.message}});
        }

    })
    .catch((_error) => {
        dispatch({
            type: BOOKING_ERROR,
            details: {status: 501, message: 'connection error. Try again'}
        });
    });
};

export default bookRoomAction; 