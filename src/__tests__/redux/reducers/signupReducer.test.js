import signUpReducer from '../../../redux/reducers/signupReducer';
import actionTypes from '../../../redux/actions/actionTypes';

describe("signup reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull signUp', () => {
        const response = signUpReducer(initialState, {
            type: actionTypes.SIGN_UP,
            userDetails: {email: 'email@barefoot.com'}
        });
        expect(response).toEqual({
            data: {email: 'email@barefoot.com'},
            error: null
        });
    });
    
    it('should test unsuccessful signUp', () => {
        const response = signUpReducer(initialState, {
            type: actionTypes.SIGN_UP_ERROR,
            error: {message: 'error signing in'}
        });
        expect(response).toEqual({
            data: null,
            error: {message: 'error signing in'}
        });
    }); 
}); 