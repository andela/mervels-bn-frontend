import {
    RATE_ACCOMMODATION_SUCCESS,
    RATE_ACCOMMODATION_FAILED
  } from '../actions/actionTypes';

const initialState = {
    rate:{},
    error:''

};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case RATE_ACCOMMODATION_SUCCESS:
        return { ...state, rate: payload };
   
    case RATE_ACCOMMODATION_FAILED:
            return { ...state, error: payload };

    default:
        return state;
    }
};
