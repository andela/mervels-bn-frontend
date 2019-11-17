import { loginSucess, loginFailure } from '../../../redux/actions/login';

describe('Login Actions', () => {
    it('Should call the action loginSuccess', () => {
      const payload = {
        value: 'value',
      };
      expect(loginSucess(payload)).toStrictEqual({
        type: 'LOGIN_SUCCESS',
        payload,
      });
    });
    it('Should call the action loginfailure', () => {
        const payload = {
          value: 'value',
        };
        expect(loginFailure(payload)).toStrictEqual({
          type: 'LOGIN_FAILURE',
          payload,
        });
      });
  });