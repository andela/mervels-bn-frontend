import verifyReducer from '../../../redux/reducers/verifyReducer';
import actionTypes from '../../../redux/actions/actionTypes';

describe("signup reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull verification', () => {
        const response = verifyReducer(initialState, {
            type: actionTypes.VERIFY_SUCCESS,
            details: {message: 'email verified successfully'}
        });

        expect(response).toEqual({
            data: 'email verified successfully',
            error: null
        });
    });
    
    it('should test unsuccessful verification', () => {
        const response = verifyReducer(initialState, {
            type: actionTypes.VERIFY_ERROR,
            error: {error: 'error verifying'}
        });
        expect(response).toEqual({
            data: null, 
            error: {error: 'error verifying'}
        });
    }); 
}); 