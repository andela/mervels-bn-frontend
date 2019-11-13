import requestsReducer from '../../../redux/reducers/requestsReducers';

describe('request Reducer', () => {
  it('should test the view request reducer', () => {
    const initialState = {
      "requests": {},
      error: null
  };
    const data = {};
    const response = {
     "requests": {},
     "error": null
    };
    const action ={
      type: 'FETCH_REQUESTS',
      payload: data,
    };
    expect(requestsReducer(initialState, action)).toEqual(response);
  });
  it('should test the view request reducer', () => {
    const initialState = {
      "requests": {},
      "error": null
    };
    const error = {};
    const response = {
      "requests": {},
      "error": {}
     };

    expect(requestsReducer(initialState, {
      type: 'FETCH_REQUESTS_FAILED',
      error,
    })).toEqual(response);
  });
});