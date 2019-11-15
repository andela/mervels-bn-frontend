import {APPROVE_REJECT_SUCCESS, APPROVE_REJECT_ERROR} from '../actions/actionTypes';

const approveReject = (state =  {data: null, error: null}, action) => {
    switch(action.type) {
        case APPROVE_REJECT_SUCCESS:
            return {...state, error: null, data: action.details};
        case APPROVE_REJECT_ERROR:
                return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default approveReject;