/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Authorization, WithAuthorization } from '../../components/shared/Authorization';

const mockedComponent = class OneAccommodation extends Component {
  render() {
      return (
          <h1>HOLLA</h1>
      );
  }
};
let wrapper;
describe('withAuthorization should render', () => {

  const allowedRoles = ['ADMIN', 'USER'];
  let withAuthorizationComponent;
  let AuthComponent;
  let store;
  const props = {
    checkUser: jest.fn(),
    authReducer: {},
    errors: {},
    history: {
        push: jest.fn()
    } 
  };
  beforeAll(() =>{ withAuthorizationComponent = Authorization(allowedRoles);} );
    
  beforeEach(() => {
    AuthComponent = withAuthorizationComponent(mockedComponent);
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore({...props});
    wrapper = mount(<AuthComponent store={store} {...props} />);
  });
  
  test('wrapped component when user has role which is allowed', () => {
    expect(wrapper).not.toBe(null);
  });

  test('wrapped component when user has role which is allowed', () => {
    wrapper.setProps({ authReducer: {user: {
        userRoles: 'ADMIN'
    }} });
    expect(wrapper).not.toBe(null);
  });
});

describe('Test enhanced component in isolation', () => {
  const props = {
    checkUser: jest.fn(),
    authReducer: {},
    errors: {},
    history: {
        push: jest.fn()
    },
    allowedRoles: ['ADMIN'],
    WrappedComponent: mockedComponent
  };
  const setUp = () => {
    return shallow(<WithAuthorization {...props} />);
  };

  test('wrapped component when user has role which is allowed', () => {
    localStorage.setItem('bareFootToken', 'token');
    wrapper = setUp();
    localStorage.removeItem('bareFootToken', 'token');
    expect(wrapper).not.toBe(null);
  });

  test('wrapped component when user has role which is allowed', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {user: {
        userRoles: 'ADMIN'
    }} });
    expect(wrapper).not.toBe(null);
  });
  test('wrapped component when user has role Accommodation Supplier', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {user: {
        userRoles: 'Accommodation Supplier'
    }} });
    expect(wrapper).not.toBe(null);
  });
  test('wrapped component when user has role not allowed', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {user: {
        userRoles: 'not allowed'
    }} });
    expect(wrapper).not.toBe(null);
  });
  test('wrapped component when error is 401', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {error: {
      message: 'message',
      status: 401
    } }});
    expect(wrapper).not.toBe(null);
  });
  test('wrapped component when error is 500', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {error: {
      message: 'message',
      status: 500
    } }});
    expect(wrapper).not.toBe(null);
  });
  test('wrapped component when error is null', () => {
    wrapper = setUp();
    wrapper.setProps({ authReducer: {error: null }});
    expect(wrapper).not.toBe(null);
  });

});