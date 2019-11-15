import {GET_REQUEST_SUCCESS, GET_REQUEST_ERROR} from '../actions/actionTypes';

const getRequestReducer = (state =  {data: null, error: null}, action) => {
    switch(action.type) {
        case GET_REQUEST_SUCCESS:
            return {...state, error: null, data: action.details};
        case GET_REQUEST_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default getRequestReducer;