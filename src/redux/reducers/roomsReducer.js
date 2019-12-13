import { GET_ROOMS_SUCCESS, GET_ROOMS_ERROR } from '../actions/actionTypes';

const initialState = {
  data: [],
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        error: null
      };
    case GET_ROOMS_ERROR:
      return{
        ...state, 
        data: [],
        error: payload
      };
    default:
      return state;
  }
};