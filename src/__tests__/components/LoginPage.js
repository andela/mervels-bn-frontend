/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moxios from 'moxios';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LoginPage } from '../../components/LoginPage';
import { LOGIN_SUCCESS } from '../../redux/actions/actionTypes';
import { socialAuth, localAuth } from '../../redux/actions/login';
import API  from '../../config/axiosInstance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let wrapper;
const props = {
  localAuth: jest.fn(),
  socialAuth: jest.fn(),
  user: {},
  history: {},
  location: {
    pathname: "/login", 
    search: "?code=eyJzdGF0dXMiOjIwMCwibWVzc2FnZSI6IlN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4iLCJkYXRhIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2TVRBc0ltWnBjbk4wVG1GdFpTSTZJa1JoZG1seklpd2liR0Z6ZEU1aGJXVWlPaUpMWVdKcGMzZGhJaXdpWlcxaGFXeEJiR3h2ZDJWa0lqcDBjblZsTENKMWMyVnlVbTlzWlhNaU9pSlNaWEYxWlhOMFpYSWlMQ0pwWVhRaU9qRTFOek0wT0RFMk9USXNJbVY0Y0NJNk1UVTNNelE0TlRJNU1uMC5hT01aSnBPR011dlpIdnBOS19kdzR3eXo1d3hvSElSb3JDUWp0ZVZZZUR3In0=", 
    hash: "", 
    state: undefined
  }
};

describe('LoginPAGE', () => {
  test('should render', () => {
    wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('prevent default', () => {
    wrapper = shallow(<LoginPage {...props} />);
    let prevent = false;
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {
            prevent = true;
        }
    });
    expect(prevent).toBe(true);
  });
  test('Should handle Input on change', () => {
    const event = {target: {name: "email", value: "email"}};
    wrapper = mount(<LoginPage {...props} />);
    expect(wrapper.instance().state.email).toBe(null);
    wrapper.find('Input[name="email"]').simulate('change', event);
    expect(wrapper.instance().state.email).toBe('email');
  });
  test('should call the correct loginUser prop function', () => {
    const mockLoginfn = jest.fn();
    const user = {
      isLoggedIn: false,
      message: null,
      error: null
    };
    wrapper = mount(<LoginPage localAuth={mockLoginfn} user={user} />);
    wrapper.find('.loginForm').simulate(
      'submit', 
      {preventDefault() {}}
    );
    expect(mockLoginfn.mock.calls.length).toBe(1);
  });
});

describe('Login dispatch actions', () => {
  let store;
  beforeEach(()=>{
    store = mockStore({
      isLoggedIn: false,
      message: null,
      error: null
    });
  });
  beforeEach(() => {
    moxios.install(API);
  });

  afterEach(() => {
    moxios.uninstall(API);
  });

  it('should dispatch social Auth action', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    store.dispatch(socialAuth(payload));
    const actions = store.getActions();
    const expectedPayload = { 
      type: LOGIN_SUCCESS,
      payload: {
      status: 200,
      message: 'message',
      data: 'data',
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });
  it('should reject social Auth action', () => {
    const payload = {
      status: 400,
      error: 'error'
    };
    store.dispatch(socialAuth(payload));
    const actions = store.getActions();
    const expectedPayload = [ { type: 'LOGIN_FAILURE', payload: 'error' } ];
    expect(actions).toEqual(expectedPayload);
  });

  it('should dispatch local Auth action', async () => {
    const data = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const user = {
      userEmail: 'email',
      userPassword: 'password',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status:200, response: { ...data }});
    });
    const expected = [
      {
        type: 'LOGIN_SUCCESS',
        payload: { status: 200, message: 'message', data: 'data' }
      }
    ];
    await store.dispatch(localAuth(user));
    const actionsCalled = store.getActions();
    expect(actionsCalled).toEqual(expected);
  });
  it('Should reject the local Auth', async () => {
    const errorResp = {
        status: 400,
        response: {
          data : {
          message:
          'invalid data'
        }
      }
    };
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errorResp);
    });
    await store.dispatch(localAuth());
    const expected = [ { type: 'LOGIN_FAILURE', payload: 'invalid data' } ];
    const actionsCalled = store.getActions();
    expect(actionsCalled).toEqual(expected);
  });
});



describe('LoginPage intergration test', () => {
  let store;
  const prop = {
    localAuth: jest.fn(),
    socialAuth: jest.fn(),
    history: {
      push: jest.fn(),
    },
    user: {
      isLoggedIn: true,
      message: 'message',
      error: null
    },
    location: {
      pathname: "/login", 
      search: "?code=eyJzdGF0dXMiOjIwMCwibWVzc2FnZSI6IlN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4iLCJkYXRhIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2TVRBc0ltWnBjbk4wVG1GdFpTSTZJa1JoZG1seklpd2liR0Z6ZEU1aGJXVWlPaUpMWVdKcGMzZGhJaXdpWlcxaGFXeEJiR3h2ZDJWa0lqcDBjblZsTENKMWMyVnlVbTlzWlhNaU9pSlNaWEYxWlhOMFpYSWlMQ0pwWVhRaU9qRTFOek0wT0RFMk9USXNJbVY0Y0NJNk1UVTNNelE0TlRJNU1uMC5hT01aSnBPR011dlpIdnBOS19kdzR3eXo1d3hvSElSb3JDUWp0ZVZZZUR3In0=", 
      hash: "", 
      state: undefined
    }
  };
  beforeEach(() => {
    store = mockStore({
      isLoggedIn: false,
      message: null,
      error: null
    });
  });
  beforeEach(() => moxios.install());
  afterEach(() => moxios.install());
  test('should render login page', () => {
    wrapper = mount(<LoginPage store={store} {...prop} />);
    const Eevent = {target: {name: "email", value: "email@gmail.com"}};
    const Pevent = {target: {name: "password", value: "pass1@word"}};
    wrapper.find('Input[name="email"]').simulate('change', Eevent);
    wrapper.find('Input[name="password"]').simulate('change', Pevent);
    wrapper.find('.loginForm').simulate(
      'submit', 
      {preventDefault() {}}
    );
    expect(wrapper.instance().state).toEqual({ email: 'email@gmail.com', password: 'pass1@word', });
  });
});

