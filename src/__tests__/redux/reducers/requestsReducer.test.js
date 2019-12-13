import requestsReducer from '../../../redux/reducers/requestsReducers';
import { FETCH_PAST, FETCH_PENDING } from '../../../redux/actions/actionTypes';

describe('request Reducer', () => {
  it('should test the view request reducer', () => {
    const initialState = {
      "requests": {},
      filtered: {},
      title: "",
      "error": null
    };
    const payload = {
      data: {},
      title: 'ALL REQUESTS'
    };
    const response = {
     "requests": {},
     filtered: {},
     title: 'ALL REQUESTS',
     "error": null
    };
    const action ={
      type: 'FETCH_REQUESTS',
      payload,
    };
    expect(requestsReducer(initialState, action)).toEqual(response);
  });
  it('should test the view request reducer', () => {
    const initialState = {
      "requests": {},
      filtered: {},
      title: "",
      "error": null
    };
    const error = {};
    const response = {
      "requests": {},
      filtered: {},
      title: "",
      "error": {}
     };

    expect(requestsReducer(initialState, {
      type: 'FETCH_REQUESTS_FAILED',
      error,
    })).toEqual(response);
  });

  it('should update the state when action FETCH_PAST is dispatched', () => {
    const initialState = {
      "requests": {
        data: [
          {
            id: 1, 
            travelDate: ['2018/11/11']
          }
        ]
      },
      filtered: {},
      title: "",
      "error": null
    };
    const payload = {
      title: 'PAST REQUESTS'
    };
    const newState = requestsReducer(initialState, {
      type: FETCH_PAST,
      payload,
    });
    expect(newState.title).toBe('PAST REQUESTS');
  });
  it('should update the state when action FETCH_PENDING is dispatched', () => {
    const initialState = {
      "requests": {
        data: [
          {
            id: 1, 
            status: 'pending'
          }
        ]
      },
      filtered: {},
      title: "",
      "error": null
    };
    const payload = {
      title: 'PENDING REQUESTS'
    };
    const newState = requestsReducer(initialState, {
      type: FETCH_PENDING,
      payload,
    });
    expect(newState.title).toBe('PENDING REQUESTS');
  });
});