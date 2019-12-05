import {BOOKING_SUCCESS, BOOKING_ERROR} from '../actions/actionTypes';

const booking = (state={data: null, error: null}, action) => {
    switch(action.type) {
        case BOOKING_SUCCESS:
            return {...state, error: null, data: action.details};
        case BOOKING_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default booking;