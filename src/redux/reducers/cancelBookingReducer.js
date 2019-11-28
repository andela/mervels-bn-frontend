import {CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_ERROR} from '../actions/actionTypes';

const cancelBooking = (state={data: null, error: null}, action) => {
    switch(action.type) {
        case CANCEL_BOOKING_SUCCESS:
            return {...state, error: null, data: action.details};
        case CANCEL_BOOKING_ERROR:
            return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default cancelBooking;