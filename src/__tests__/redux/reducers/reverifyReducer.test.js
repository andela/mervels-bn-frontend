import reverifyReducer from '../../../redux/reducers/reverifyReducer';
import actionTypes from '../../../redux/actions/actionTypes';

describe("signup reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull reverification', () => {
        const response = reverifyReducer(initialState, {
            type: actionTypes.REVERIFY_SUCCESS,
            details: {message: 'reverified successfully'}
        });

        expect(response).toEqual({
            data: {message: 'reverified successfully'},
            error: null
        });
    });
    
    it('should test unsuccessful reverification', () => {
        const response = reverifyReducer(initialState, {
            type: actionTypes.REVERIFY_ERROR,
            error: {error: 'error reverifying'}
        });
        expect(response).toEqual({ 
            data: null, 
            error: {error: 'error reverifying'}
        });
    }); 
}); 