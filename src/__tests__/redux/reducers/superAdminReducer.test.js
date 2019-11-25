import superAdminReducers from '../../../redux/reducers/superAdminReducers';

describe('requestApprovals Reducer', () => {
  it('should test the view superAdmin reducer', () => {
    const initialState = {
        userRoles: {},
        error: null
    };
    const data = {};
    const response = {
        userRoles: {},
        error: null
    };
    const action ={
      type: 'ASSIGN_SUCCESS',
      payload: data,
    };
    expect(superAdminReducers(initialState, action)).toEqual(response);
  });
  it('should test the view superAdmin reducer', () => {
    const initialState = {
        userRoles: {},
        error: null
    };
    const error = {};
    const response = {
      userRoles: {},
      error: {}
     };

    expect(superAdminReducers(initialState, {
      type: 'ASSIGN_FAILED',
      error,
    })).toEqual(response);
  });
});