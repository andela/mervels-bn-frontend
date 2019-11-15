import approveRejectReducer from '../../../redux/reducers/approveRejectReducer';
import {APPROVE_REJECT_SUCCESS, APPROVE_REJECT_ERROR} from '../../../redux/actions/actionTypes';

describe("signup reducer", () => {
    const initialState = {data: null, error: null};
    it('should test successfull approval/reject', () => {
        const response = approveRejectReducer(initialState, {
            type: APPROVE_REJECT_SUCCESS,
            details: {status: 200, message: 'trquest approved successfully'}
        });

        expect(response).toEqual({
            data: {status: 200, message: 'trquest approved successfully'},
            error: null
        });
    });
    
    it('should test unsuccessful approval/reject', () => {
        const response = approveRejectReducer(initialState, {
            type: APPROVE_REJECT_ERROR,
            error: {error: 'some generic error'}
        });
        expect(response).toEqual({
            data: null, 
            error: {error: 'some generic error'}
        });
    }); 
}); 