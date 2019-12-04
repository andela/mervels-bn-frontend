import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import API  from '../../../config/axiosInstance';
import { 
    GET_ACCOMMODATIONS_SUCCESS,
    GET_ACCOMMODATIONS_FAILURE,
    GET_ACCOMMODATION_SUCCESS,
    GET_ACCOMMODATION_FAILURE,
    ADD_ACCOMMODATION_SUCCESS,
    ADD_ACCOMMODATION_FAILURE,
    ADD_ROOMS_SUCCESS,
    ADD_ROOMS_FAILURE
} from '../../../redux/actions/actionTypes';
import { createRooms, createAccommodation, getAccommodation, getAccommodations  } from '../../../redux/actions/accommodationsAction';

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
    const user = {
        role: 'requester',
        id: 9
    };
    it('should test get accommodations actions', async (done) => {
      const expectedPayload = {
        type: GET_ACCOMMODATIONS_SUCCESS,
        payload: {
          accommodations: [],
          user: {
            id: 9,
            role: "requester",
          },
        }
      };
      moxios.wait(async () => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status:200, response: { message: 'message', data: []}});
      });
      await store.dispatch(getAccommodations(user));
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
            type: GET_ACCOMMODATIONS_FAILURE,
            payload: 'Server error'
          };
      await store.dispatch(getAccommodations(user));
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
          type: 'GET_ACCOMMODATIONS_FAILURE',
          payload: 'Invalid or expired token used'
    };
    await store.dispatch(getAccommodations(user));
    const actionTypes = store.getActions();
    expect(actionTypes[0]).toStrictEqual(expectedActions);
    done();
  });

  it('should test get one accommodation actions', async (done) => {
    const expectedPayload = {
      type: GET_ACCOMMODATION_SUCCESS,
      payload:  {message: 'message', data: {}}
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status:200, response: { message: 'message', data: {}}});
    });
    await store.dispatch(getAccommodation(1));
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
          type: GET_ACCOMMODATION_FAILURE,
          payload: 'Server error'
        };
    await store.dispatch(getAccommodation(1));
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
          type: GET_ACCOMMODATION_FAILURE,
          payload: 'Invalid or expired token used'
    };
    await store.dispatch(getAccommodation(1));
    const actionTypes = store.getActions();
    expect(actionTypes[0]).toStrictEqual(expectedActions);
    done();
  });

  it('should test create accommodation actions', async (done) => {
    const expectedPayload = {
      type: ADD_ACCOMMODATION_SUCCESS,
      payload:  {message: 'message', data: {}}
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status:200, response: { message: 'message', data: {}}});
    });
    await store.dispatch(createAccommodation({name:'accommodation'}));
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
          type: ADD_ACCOMMODATION_FAILURE,
          payload: 'Server error'
        };
    await store.dispatch(createAccommodation({name:'accommodation'}));
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
          type: ADD_ACCOMMODATION_FAILURE,
          payload: 'Invalid or expired token used'
    };
    await store.dispatch(createAccommodation({name:'accommodation'}));
    const actionTypes = store.getActions();
    expect(actionTypes[0]).toStrictEqual(expectedActions);
    done();
  });

  it('should test create accommodation actions', async (done) => {
    const expectedPayload = {
      type: ADD_ROOMS_SUCCESS,
      payload:  {message: 'message', data: {}}
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status:200, response: { message: 'message', data: {}}});
    });
    await store.dispatch(createRooms({name:'room'}));
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
          type: ADD_ROOMS_FAILURE,
          payload: 'Server error'
        };
    await store.dispatch(createRooms({name:'room'}));
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
          type: ADD_ROOMS_FAILURE,
          payload: 'Invalid or expired token used'
    };
    await store.dispatch(createRooms({name:'room'}));
    const actionTypes = store.getActions();
    expect(actionTypes[0]).toStrictEqual(expectedActions);
    done();
  });
});