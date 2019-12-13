import { GET_ACCOMMODATIONS_SUCCESS, GET_ACCOMMODATIONS_FAILURE } from '../actions/actionTypes';

const initialState = {
  accommodations: [],
  error: ''
};

export default (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case GET_ACCOMMODATIONS_SUCCESS:
      if(payload.user.role === 'Accommodation Supplier') {
        const supAccommodations = payload.accommodations.filter((acc) => acc.owner === payload.user.id );
        return {
          ...state,
          accommodations: supAccommodations,
          error: ''
        };
      }
      return {
        ...state,
        accommodations: payload.accommodations,
        error: ''
      };
    case GET_ACCOMMODATIONS_FAILURE:
      return{
        ...state,
        accommodations: '',
        error: payload
      };
    default:
      return state;
  }
};
