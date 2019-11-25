import { AUTHORIZATION_SUCCESS } from '../actions/actionTypes';

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
    default:
      return state;
  }
};