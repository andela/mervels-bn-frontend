import { GET_ACCOMMODATION_SUCCESS, GET_ACCOMMODATION_FAILURE } from '../actions/actionTypes';

const initialState = {
  accommodation: {},
  error: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommodation: payload.data,
        error: ''
      };
    case GET_ACCOMMODATION_FAILURE:
      return{
        ...state,
        accommodation: '',
        error: payload
      };
    default:
      return state;
  }
};
