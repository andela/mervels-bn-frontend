import {getRequest} from '../../API/managerApi';
import {GET_REQUEST_SUCCESS, GET_REQUEST_ERROR} from './actionTypes';

const getSingleRequest = (requestId) => (dispatch) => {
   return getRequest(requestId).then((data) => {
       switch(data.status) {
           case 200:
               dispatch({type: GET_REQUEST_SUCCESS, details: {status: data.status, request: data.data.data[0],  message: data.data.message}});
               break;
           default:
               dispatch({type: GET_REQUEST_ERROR, error: {status: data.status, message: data.message}});
       }
   // eslint-disable-next-line no-unused-vars
   }).catch((error) => {
    dispatch({type: GET_REQUEST_ERROR, error: {status: 501, message: 'Connection error'}});
   }); 
};
export default getSingleRequest;