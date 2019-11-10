import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../../redux/actions/actionType';
import loginReducer from '../../../redux/reducers/login';

const initialState = {
    isLoggedIn: false,
    message: null,
    error: null
};

describe('Reducers', () => {
  it('should update the state when calling LOGIN_SUCESS', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const newState = loginReducer(initialState, {
      type: LOGIN_SUCCESS,
      payload,
    });
    expect(newState.isLoggedIn).toBe(true);
  });
  it('should update the state when calling LOGIN_FAILURE', () => {
    const payload = 'error';
    const newState = loginReducer(initialState, {
      type: LOGIN_FAILURE,
      payload,
    });
    expect(newState.isLoggedIn).toBe(false);
  });
});