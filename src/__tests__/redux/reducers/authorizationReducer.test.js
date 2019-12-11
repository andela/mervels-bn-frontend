import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from '../../../redux/actions/actionTypes';
import authReducer from '../../../redux/reducers/authorizationReducer';

describe('Accommodation Reducers', () => {
    const initialState ={
        user: null,
        error: null
    };
    it('return initial state', () => {
        const newState = authReducer(initialState, {
            type: 'default',
        });
        expect(newState).toEqual(initialState);
    });
  it('should update the state when calling GET_ACCOMMODATION_SUCCESS', () => {
    const payload = {
      status: 200,
      message: 'message',
      user: 'user',
    };
    const newState = authReducer(initialState, {
      type: AUTHORIZATION_SUCCESS,
      payload,
    });
    expect(newState.user).toEqual(payload.user);
  });
  it('should update the state when calling GET_ACCOMMODATION_FAILURE', () => {
    const payload = 'error';
    const newState = authReducer(initialState, {
      type: AUTHORIZATION_ERROR,
      payload,
    });
    expect(newState.error).toBe(payload);
  });
});