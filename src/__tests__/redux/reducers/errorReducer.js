import { NETWORK_ERROR, SERVER_ERROR } from '../../../redux/actions/actionTypes';
import errorReducer from '../../../redux/reducers/errorReducer';


const initialState = {
    status: '',
    message: ''
};

describe('Reducers', () => {
  it('should update the state when calling NETWORK_ERROR', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const newState = errorReducer(initialState, {
      type: NETWORK_ERROR,
      payload,
    });
    expect(newState.message).toBe("Can't connect to Server");
  });
  it('should update the state when calling SERVER_ERROR', () => {
    const payload = {
        errors: {
            status: 500,
            errors: 'Server Error'
        }
      };
    const newState = errorReducer(initialState, {
      type: SERVER_ERROR,
      ...payload,
    });
    expect(newState.status).toBe(500);
  });
  it('should update the state when calling SERVER_ERROR', () => {
    const payload = {
        errors: {
          errors:{
            message: 'Server Error'
          }
        }
      };
    const newState = errorReducer(initialState, {
      type: SERVER_ERROR,
      ...payload,
    });
    expect(newState.status).toBe(500);
  });

});