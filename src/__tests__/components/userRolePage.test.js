/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme';
import React from 'react';
import { UserRolesTest, mapStateToProps } from '../../components/UserRolesPage';

let wrapper;

describe('RequestView Component', () => {
    const props = {
      userRoles:{},
      assignUser: jest.fn(),
      handleChange: jest.fn(),
      addedSupplier: {data: null, error: null},
      history: {push: jest.fn()},
      match:{
        path:'/approvals'
      }
    };

    beforeEach(() => {
      wrapper = mount(
        <UserRolesTest assignUser={jest.fn()} userRoles={props.userRoles} match={props.match} />,
      );
    });
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should render setting component without error', () => {
      expect(wrapper).toHaveLength(1);
    }); 

    it('should submit a form for changing roles', () => {
        wrapper.setState({
            email: 'johndoe@gmail.com',
            role: 'Manager',
            errors:{email: undefined, role: undefined}
        });
        const userInfo ={
            userEmail: 'johndoe@gmail.com',
            userRole: 'Manager',
        };
        wrapper.setProps({assignUser: jest.fn()});

        const form = wrapper.find('.roles-form');
        const event = { preventDefault: jest.fn() };
        const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
        const roleInput = {target: {name: "role", value: "Manager"}};
        form.find('input[name="email"]').simulate('change', emailInput);
        form.find('Select[name="role"]').simulate('change', roleInput);
        form.simulate('submit', event);
        const {assignUser} = wrapper.instance().props;
        expect(assignUser).toHaveBeenCalledWith(userInfo);
    }); 

    it('should submit a form with errors', () => {
      wrapper.setState({
          email: 'johndoe@gmail.com',
          role: '',
          errors:{}
      });
      wrapper.setProps({assignUser: jest.fn()});

      const form = wrapper.find('.roles-form');
      const event = { preventDefault: jest.fn() };
      const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
      form.find('input[name="email"]').simulate('change', emailInput);
      form.simulate('submit', event);
      const {assignUser} = wrapper.instance().props;
      expect(assignUser).toHaveBeenCalledTimes(0);
  });
  
    test('should test handle change for role assignment', () => {
        const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
        const roleInput = {target: {name: "role", value: "Manager"}};
        const form = wrapper.find('.roles-form');
        form.find('input[name="email"]').simulate('change', emailInput);
        form.find('Select[name="role"]').simulate('change', roleInput);
        expect(wrapper.instance().state.email).toEqual('johndoe@gmail.com',);
      });

    it('should test the mapStateToProps for userRoles', () => {
        const initialState = {
            userRoles:{},
            error: null,
            addedSupplier: {}
        };
        expect(mapStateToProps(initialState).userRoles).toEqual({});
    });

    it('should submit a supplier form without errors', () => {
      wrapper.setState({supplier: {errors: {
        firstName: '', lastName: '', userEmail: ''
      }}});
      wrapper.setProps({addSupplier: jest.fn()});

      const userDetails = {
        firstName: 'Bahati',
        lastName: 'Robben',
        userEmail: 'bahatirobben@gmail.com'
      };
      const prev = wrapper.instance().state;
      wrapper.setState({...prev, supplier: {...prev.supplier, errors: {...prev.supplier.errors, firstName: undefined, lastName: undefined, userEmail: undefined}}});
      const form = wrapper.find('.supplier-form');
      const event = { preventDefault: jest.fn() }; 
      const emailInput = {target: {name: "userEmail", value: "bahatirobben@gmail.com"}};
      const firstNameInput = {target: {name: "firstName", value: "Bahati"}};
      const lastNameInput = {target: {name: "lastName", value: "Robben"}};
      form.find('input[name="userEmail"]').simulate('change', emailInput);
      form.find('input[name="firstName"]').simulate('change', firstNameInput);
      form.find('input[name="lastName"]').simulate('change', lastNameInput);
      form.simulate('submit', event);
      const {addSupplier} = wrapper.instance().props; 
      expect(addSupplier).toHaveBeenCalledWith(userDetails);
  }); 

  it("should not submit suppliers form with erros", () => {
    wrapper.setState();
      wrapper.setProps({addSupplier: jest.fn()});
      const form = wrapper.find('.supplier-form');
      const event = { preventDefault: jest.fn() }; 
      form.simulate('submit', event);
      const {addSupplier} = wrapper.instance().props; 
      expect(addSupplier).toHaveBeenCalledTimes(0);
  });

  it('should handle successful creation of supplier', () => {
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {data: {status: 201, message: 'success'}}, error: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should handle 401 error of supplier', () => {
    window.localStorage.removeItem =  () => jest.fn();
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {error: {status: 401, message: 'error'}}, data: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledWith('/login');
  });

  it('should handle 403 error of supplier', () => {
    window.localStorage.removeItem =  () => jest.fn();
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {error: {status: 403, message: 'error'}}, data: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledWith('/AccessForbidden');
  });

  it('should handle 500 error of supplier', () => {
    window.localStorage.removeItem =  () => jest.fn();
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {error: {status: 500, message: 'error'}}, data: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledWith('/500');
  });
 
  it('should handle 409 error of supplier', () => {
    window.localStorage.removeItem =  () => jest.fn();
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {error: {status: 409, message: 'error'}}, data: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should handle any other error of supplier', () => {
    window.localStorage.removeItem =  () => jest.fn();
    wrapper.setProps({history: { push: jest.fn() }, addedSupplier: {error: {status: 501, message: 'error'}}, data: null});
    const {history} = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
  });
 
});