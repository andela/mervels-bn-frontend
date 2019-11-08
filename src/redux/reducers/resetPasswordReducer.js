/* eslint-disable no-debugger */
import * as types from "../actions/actionTypes";

const initialState = {
  message: ""
};

export default function resetPasswordReducer(state = initialState, actions) {
  switch (actions.type) {
    case types.RESET_PASSWORD_SENT:
    case types.PASSWORD_RESET_SUCCESS:
      return { ...state, message: actions.message };
    default:
      return state;
  }
}
