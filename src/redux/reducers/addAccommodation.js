import { ADD_ACCOMMODATION_FAILURE, ADD_ACCOMMODATION_SUCCESS } from '../actions/actionTypes';

const initialState = {
  accommodation: null,
  error: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommodation: payload.data,
        error: ''
      };
    case ADD_ACCOMMODATION_FAILURE:
      return{
        ...state,
        accommodation: '',
        error: payload
      };
    default:
      return state;
  }
};
