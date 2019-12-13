import { ADD_ROOMS_FAILURE, ADD_ROOMS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  rooms: null,
  error: ''
};

export default (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case ADD_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: payload.data,
        error: ''
      };
    case ADD_ROOMS_FAILURE:
      return{
        ...state,
        rooms: '',
        error: payload
      };
    default:
      return state;
  }
};
