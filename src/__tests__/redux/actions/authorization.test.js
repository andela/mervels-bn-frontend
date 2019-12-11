import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import API  from '../../../config/axiosInstance';
import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from '../../../redux/actions/actionTypes';
import { checkUser  } from '../../../redux/actions/authorization';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
describe('test Search Action', () => {
    beforeEach(() => {
      store = mockStore({});
      moxios.install(API);
    });
    afterEach(() => {
      moxios.uninstall(API);
    });
    it('should test authorization sucess', async (done) => {
      const expectedPayload = {
        type: AUTHORIZATION_SUCCESS,
        payload: {user: 'data'}
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status:200, response: { message: 'message', data: 'data'}});
      });
      await store.dispatch(checkUser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedPayload);
      done();
    });

    it('should test failed connection', async (done) => {
      const responseData = {
        status: 500,
        response: undefined
      };

      moxios.wait(async() => {
      const request = moxios.requests.mostRecent();
        request.reject(responseData);
      });

      const expectedActions = {
            type: AUTHORIZATION_ERROR,
            payload: {status: 500, message: 'Server error'}
          };
        await store.dispatch(checkUser());
      const actionsCalled = store.getActions();
      expect(actionsCalled[0]).toStrictEqual(expectedActions);
      done();
    });

  it('should test get accommodations failed actions', async (done) => {
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

    moxios.wait(async() => {
      const request = moxios.requests.at(0);
      request.reject(responseData);
    });

    const expectedActions = {
        type: AUTHORIZATION_ERROR,
        payload: responseData.response.data
    };
    await store.dispatch(checkUser());
    const actionTypes = store.getActions();
    expect(actionTypes[0]).toStrictEqual(expectedActions);
    done();
  });
});