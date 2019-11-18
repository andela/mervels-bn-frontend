import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import Enzyme from 'enzyme/build';
import promiseMiddleware from 'redux-promise-middleware';
import Adapter from 'enzyme-adapter-react-16/build';
import { fetchRequests, getPending, getPast, searchRequests } from '../../../redux/actions/requestsAction';
import * as actions from '../../../redux/actions/actionTypes';
import API  from '../../../config/axiosInstance';

const middleware = [thunk, promiseMiddleware];
Enzyme.configure({ adapter: new Adapter() });

let store;
const mockStore = configureStore(middleware);


describe('should test request actions', () => {
  store = mockStore({});

    beforeEach(() => {
      moxios.install(axios);
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should test get requests actions', async () => {
      const responseData = {
          status: 200,
          response:{
            statusText: 'xxxxx',
          message: "Your requests were retrieved successfully",
          data: []
          }
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(responseData);
      });

      const expectedActions = actions.FETCH_REQUESTS;
      return store.dispatch(fetchRequests()).then(() =>{
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[0]).toEqual(expectedActions);
      });
    });
    it('should test get requests failed actions', async () => {
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

      const expectedActions = actions.FETCH_REQUESTS_FAILED;
      return store.dispatch(fetchRequests()).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
    it('should test failed connection', async () => {
      const responseData = {
          status: 500,
          response: undefined
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(responseData);
      });

      const expectedActions = actions.FETCH_REQUESTS_FAILED;
      return store.dispatch(fetchRequests()).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
    it('Should call the action get pending', () => {
      expect(getPending()).toStrictEqual({
        type: actions.FETCH_PENDING,
        payload: {
          title: 'PENDING REQUESTS'
      }
      });
    });
    it('Should call the action get past', () => {
      expect(getPast()).toStrictEqual({
        type: actions.FETCH_PAST,
        payload: {
          title: 'PAST REQUESTS'
      }
      });
    });
  });

describe('test Search Action', () => {
  beforeEach(() => {
    moxios.install(API);
  });
  afterEach(() => {
    moxios.uninstall(API);
  });
    it('should test search requests actions', async () => {
      const responseData = {
          status: 200,
          response:{
            statusText: 'xxxxx',
          message: "Your requests were retrieved successfully",
          data: []
          }
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(responseData);
      });

      const expectedActions = actions.FETCH_REQUESTS;
      return store.dispatch(searchRequests('reason', 1)).then(() =>{
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[0]).toEqual(expectedActions);
      });
    });
    it('should test failed connection', async () => {
        const responseData = {
            status: 500,
            response: undefined
        };
  
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject(responseData);
        });
  
        const expectedActions = actions.FETCH_REQUESTS_FAILED;
        return store.dispatch(searchRequests('reason', 's')).then(() =>
        {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
          expect(actionTypes[1]).toEqual(expectedActions);
        });
    });
    it('should test get requests failed actions', async () => {
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

      const expectedActions = actions.FETCH_REQUESTS_FAILED;
      return store.dispatch(searchRequests('reason', 's')).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
  });
  