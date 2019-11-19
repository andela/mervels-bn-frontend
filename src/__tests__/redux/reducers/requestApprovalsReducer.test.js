import requestApprovalsReducer from '../../../redux/reducers/requestApprovalsReducer';

describe('requestApprovals Reducer', () => {
  it('should test the view approvals reducer', () => {
    const initialState = {
      "approvals": {},
      error: null
  };
    const data = {};
    const response = {
     "approvals": {},
     "error": null
    };
    const action ={
      type: 'FETCH_REQUEST_APPROVALS',
      payload: data,
    };
    expect(requestApprovalsReducer(initialState, action)).toEqual(response);
  });
  it('should test the view approvals reducer', () => {
    const initialState = {
      "approvals": {},
      "error": null
    };
    const error = {};
    const response = {
      "approvals": {},
      "error": {}
     };

    expect(requestApprovalsReducer(initialState, {
      type: 'FETCH_REQUEST_APPROVALS_FAILED',
      error,
    })).toEqual(response);
  });
});