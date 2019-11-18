/* eslint-disable no-debugger */
import * as types from '../actions/actionTypes';

const initialState = {
    status: '',
    message: ''
};
export default function  errorReducer(state = initialState, actions) {
    if(types.NETWORK_ERROR === actions.type){
      return { ...state,  status: 408, message: "Can't connect to Server"  };
    }
    if(types.SERVER_ERROR === actions.type){
      return { ...state,  status: actions.errors.status || 500, message: actions.errors.message|| actions.errors.errors };
    }
    return { ...state};
}