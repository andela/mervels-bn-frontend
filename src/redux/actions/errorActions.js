/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import * as types from "./actionTypes";

export function networkError(error) {
  return {
    type: types.NETWORK_ERROR,
    errors: error
  };
}

export function serverError(error) {

  return {
    type: types.SERVER_ERROR,
    errors: error.data
  };
}

export function handleError(error) {
  return function(dispatch) {
    error.response
      ? dispatch(serverError(error.response))
      : dispatch(networkError(error));
  };
}
