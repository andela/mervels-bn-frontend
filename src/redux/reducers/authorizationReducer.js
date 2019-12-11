import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        user: payload.user,
        error: null
      };
    case AUTHORIZATION_ERROR:
      return {
        ...state,
        user: null,
        error: payload
      };
    default:
      return state;
  }
};