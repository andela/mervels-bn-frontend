import { PASSWORD_RESET_SUCCESS, RESET_PASSWORD_SENT } from '../../../redux/actions/actionTypes';
import resetPasswordReducer from '../../../redux/reducers/resetPasswordReducer';

const initialState = {
    message: ""
  };

describe('Reducers', () => {
  it('should update the state when calling RESET PASSWORD SENT', () => {
    const payload = {
      message: 'Reset Password Sent',
    };
    const newState = resetPasswordReducer(initialState, {
      type: RESET_PASSWORD_SENT,
      ...payload,
    });
    expect(newState.message).toBe('Reset Password Sent');
  });
  it('should update the state when calling RESET PASSWORD SENT', () => {
    const payload = {
        message: 'Password Reset Successful',
      };
    const newState = resetPasswordReducer(initialState, {
      type: PASSWORD_RESET_SUCCESS,
      ...payload,
    });
    expect(newState.message).toBe('Password Reset Successful');
  });
});