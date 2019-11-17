import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  message: null,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        message: payload.message
      };
    case LOGIN_FAILURE:
      return{
        ...state,
        isLoggedIn: false,
        error: payload
      };
    default:
      return state;
  }
};