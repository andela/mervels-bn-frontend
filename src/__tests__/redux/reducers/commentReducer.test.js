import commentReducers from '../../../redux/reducers/commentReducers';

describe(' get comments Reducer', () => {
  it('should test the get comment reducer', () => {
    const initialState = {
        comments: {},
        error: null
    };
    const data = {};
    const response = {
        comments: {},
        error: null
    };
    const action ={
      type: 'GET_COMMENTS',
      payload: data,
    };
    expect(commentReducers(initialState, action)).toEqual(response);
  });
  it('should test the get comment failed reducer', () => {
    const initialState = {
        comments: {},
        error: null
    };
    const error = {};
    const response = {
        comments: {},
      error: {}
     };

    expect(commentReducers(initialState, {
      type: 'GET_COMMENTS_FAILED',
      error,
    })).toEqual(response);
  });
});

describe(' post comments Reducer', () => {
    it('should test the post comment reducer', () => {
      const initialState = {
          comments: {data:[{}]},
          error: null
      };
      const data = {data:{}};
      const response = {
          comments: {data:[{},{}]},
          error: null
      };
      const action ={
        type: 'POST_COMMENTS',
        payload: data,
      };
      expect(commentReducers(initialState, action)).toEqual(response);
    });
    it('should test the post comment failed reducer', () => {
      const initialState = {
          comments: {},
          error: null
      };
      const error = {};
      const response = {
          comments: {},
        error: {}
       };

      expect(commentReducers(initialState, {
        type: 'POST_COMMENTS_FAILED',
        error,
      })).toEqual(response);
    });
  });

  describe(' delete comments Reducer', () => {
    it('should test the delete comment reducer', () => {
      const initialState = {
          comments: {data:[{},{}]},
          error: null
      };
      const data = {data:{}};
      const response = {
          comments: {data:[{}]},
          error: null
      };
      const action ={
        type: 'DELETE_COMMENTS',
        payload: data,
      };
      expect(commentReducers(initialState, action)).toEqual(response);
    });
  });