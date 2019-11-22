 import {approveReject} from '../../API/managerApi';
 import {APPROVE_REJECT_ERROR, APPROVE_REJECT_SUCCESS} from './actionTypes';

 const ApproveReject = ({action, requestId, reason}) => (dispatch) => {
    return approveReject(action, requestId, reason).then((data) => {
        switch(data.status) {
            case 200:
                dispatch({type: APPROVE_REJECT_SUCCESS, details: {status: 200, message: `Request ${action}ed Successfully`}});
                break;
            case 401:
                dispatch({type: APPROVE_REJECT_ERROR, error: {status: 401, message: 'Current session is expired. Login again'}});
                break;
            case 409:
                dispatch({type: APPROVE_REJECT_ERROR, error: {status: 409, message: data.message}});
                break;
            case 403:
                dispatch({type: APPROVE_REJECT_ERROR, error: {status: 403, message: 'You are not allowed to perform this task'}});
                break;
            case 404:
                dispatch({type: APPROVE_REJECT_ERROR, error: {status: 404, message: 'Request not found'}});
                break;
            default:
                dispatch({type: APPROVE_REJECT_ERROR, error: {status: 500, message: 'Server error'}});
        }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
        dispatch({type: APPROVE_REJECT_ERROR, error: {status: 501, message: 'Connection error'}});
       });; 
};
export default ApproveReject;