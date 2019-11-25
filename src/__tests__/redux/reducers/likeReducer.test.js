import likeReducer from '../../../redux/reducers/likeReducer';
import { LIKE_ERROR, LIKE_SUCCESS } from '../../../redux/actions/actionTypes';

describe('Like Reducer', () => {
    it('should test successfull like', () => {
        const response = likeReducer({}, {
            type: LIKE_SUCCESS,
            message: ''
        });
        expect(response.status).toEqual('like_success');
    });
    it('should test unsuccessfull like', () => {
        const response = likeReducer({}, {
            type: LIKE_ERROR,
            error: ''
        });
        expect(response.status).toEqual('like_error');
    });
    it('should test status unknown', () => {
        const response = likeReducer({ x: 'x' }, {
            type: 'x',
            error: ''
        });
        expect(response.status).toEqual(undefined);
    });
});
