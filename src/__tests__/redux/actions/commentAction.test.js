import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import Enzyme from 'enzyme/build';
import promiseMiddleware from 'redux-promise-middleware';
import Adapter from 'enzyme-adapter-react-16/build';
import { getComment, postComment, deleteComment } from '../../../redux/actions/commentAction';
import * as actions from '../../../redux/actions/actionTypes';

const middleware = [thunk, promiseMiddleware];
Enzyme.configure({ adapter: new Adapter() });

let store;
const mockStore = configureStore(middleware);


describe('should test get comment actions', () => {
  store = mockStore({});

    beforeEach(() => {
      moxios.install(axios);
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should test comment actions', async () => {
      const responseData = {
          status: 200,
          response:{
            statusText: 'xxxxx',
          message: "some message",
          data: []
          }
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(responseData);
      });

      const expectedActions = actions.GET_COMMENTS;
      return store.dispatch(getComment(1)).then(() =>{
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[0]).toEqual(expectedActions);
      });
    });
    it('should test get comments failed actions', async () => {
      const responseData = {
          status: 401,
          response: {
            data: {
              "status": 401,
              "message": "Invalid or expired token used",
              "error": "Authentication Error"
            }
          }
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(responseData);
      });

      const expectedActions = actions.GET_COMMENTS_FAILED;
      return store.dispatch(getComment(1)).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
    it('should test comments failed connection', async () => {
      const responseData = {
          status: 500,
          response: undefined
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(responseData);
      });

      const expectedActions = actions.GET_COMMENTS_FAILED;
      return store.dispatch(getComment(1)).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
});

describe('should test post comment actions', () => {
    store = mockStore({});
  
      beforeEach(() => {
        moxios.install(axios);
      });
      afterEach(() => {
        moxios.uninstall();
      });
      it('should test post comment actions', async () => {
        const responseData = {
            status: 201,
            response:{
              statusText: 'xxxxx',
            message: "some message",
            data: {}
            }
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith(responseData);
        });
  
        const expectedActions = actions.POST_COMMENTS;
        return store.dispatch(postComment(1, {'comment': 'xxxxx'})).then(() =>{
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[3]).toEqual(expectedActions);
        });
      });
      it('should test post comment failed actions', async () => {
        const responseData = {
            status: 401,
            response: {
              data: {
                "status": 401,
                "message": "Invalid or expired token used",
                "error": "Authentication Error"
              }
            }
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject(responseData);
        });
  
        const expectedActions = actions.POST_COMMENTS_FAILED;
        return store.dispatch(postComment(1, {'comment':'xxxx'})).then(() =>
        {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[4]).toEqual(expectedActions);
        });
      });
      it('should test post comment failed connection', async () => {
        const responseData = {
            status: 500,
            response: undefined
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject(responseData);
        });
  
        const expectedActions = actions.POST_COMMENTS_FAILED;
        return store.dispatch(postComment(1, { 'comment': 'xxxxx'})).then(() =>
        {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[5]).toEqual(expectedActions);
        });
      });
  });

  describe('should test delete comment actions', () => {
    store = mockStore({});
  
      beforeEach(() => {
        moxios.install(axios);
      });
      afterEach(() => {
        moxios.uninstall();
      });
      it('should test delete comment actions', async () => {
        const responseData = {
            status: 200,
            response:{
              statusText: 'xxxxx',
            message: "some message",
            data: {}
            }
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith(responseData);
        });
  
        const expectedActions = actions.DELETE_COMMENTS;
        return store.dispatch(deleteComment(1)).then(() =>{
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[6]).toEqual(expectedActions);
        });
      });

      it('should test delete comment failed actions', async () => {
        const responseData = {
            status: 401,
            response: {
              data: {
                "status": 401,
                "message": "Invalid or expired token used",
                "error": "Authentication Error"
              }
            }
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject(responseData);
        });
  
        const expectedActions = actions.DELETE_COMMENTS_FAILED;
        return store.dispatch(deleteComment(1)).then(() =>
        {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[7]).toEqual(expectedActions);
        });
      });
      it('should test post comment failed connection', async () => {
        const responseData = {
            status: 500,
            response: undefined
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject(responseData);
        });
  
        const expectedActions = actions.DELETE_COMMENTS_FAILED;
        return store.dispatch(deleteComment(1)).then(() =>
        {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[7]).toEqual(expectedActions);
        });
      });
  });