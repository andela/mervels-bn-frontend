import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import Enzyme from 'enzyme/build';
import promiseMiddleware from 'redux-promise-middleware';
import Adapter from 'enzyme-adapter-react-16/build';
import { assignUser } from '../../../redux/actions/superAdminAction';
import * as actions from '../../../redux/actions/actionTypes';

const middleware = [thunk, promiseMiddleware];
Enzyme.configure({ adapter: new Adapter() });

let store;
const mockStore = configureStore(middleware);


describe('should test assign role actions', () => {
  store = mockStore({});

    beforeEach(() => {
      moxios.install(axios);
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should test assignUser actions', async () => {
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

      const expectedActions = actions.ASSIGN_SUCCESS;
      return store.dispatch(assignUser({userEmail:"johndoe@gmail.com", userRole: "manager"})).then(() =>{
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

      const expectedActions = actions.ASSIGN_FAILED;
      return store.dispatch(assignUser({userEmail:"johndoe@gmail.com", userRole: "manager"})).then(() =>
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

      const expectedActions = actions.ASSIGN_FAILED;
      return store.dispatch(assignUser({userEmail:"johndoe@gmail.com", userRole: "manager"})).then(() =>
      {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes[1]).toEqual(expectedActions);
      });
    });
  });