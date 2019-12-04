import feedbackReducer from '../../../redux/reducers/feedbackReducer';
import { FEEDBACK_ERROR, FEEDBACK_SUCCESS } from '../../../redux/actions/actionTypes';

describe('Profile Reducer', () => {
    it('should test successfull profile retrieval', () => {
        const response = feedbackReducer({}, {
            type: FEEDBACK_SUCCESS,
            message: ''
        });
        expect(response.status).toEqual('feedback_success');
    });
    it('should test unsuccessfull profile retrieval', () => {
        const response = feedbackReducer({}, {
            type: FEEDBACK_ERROR,
            error: ''
        });
        expect(response.status).toEqual('feedback_error');
    });
    it('should test status unknown', () => {
        const response = feedbackReducer({ x: 'x' }, {
            type: 'x',
            error: ''
        });
        expect(response.status).toEqual(undefined);
    });
});
