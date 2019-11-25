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
      history: { push: jest.fn() },
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

    it('should render UserRoles component with no requests', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should submit a form', () => {
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

        const form = wrapper.find('form');
        const event = { preventDefault: jest.fn() };
        const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
        const roleInput = {target: {name: "role", value: "Manager"}};
        wrapper.find('input[name="email"]').simulate('change', emailInput);
        wrapper.find('Select[name="role"]').simulate('change', roleInput);
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

      const form = wrapper.find('form');
      const event = { preventDefault: jest.fn() };
      const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
      wrapper.find('input[name="email"]').simulate('change', emailInput);
      form.simulate('submit', event);
      const {assignUser} = wrapper.instance().props;
      expect(assignUser).toHaveBeenCalledTimes(0);
  });

    test('should test handle change for role assignment', () => {
        const emailInput = {target: {name: "email", value: "johndoe@gmail.com"}};
        const roleInput = {target: {name: "role", value: "Manager"}};
        wrapper.find('input[name="email"]').simulate('change', emailInput);
        wrapper.find('Select[name="role"]').simulate('change', roleInput);
        expect(wrapper.instance().state).toEqual({
            email: 'johndoe@gmail.com',
            role: 'Manager',
            "errors": {},
        });
      });

    it('should test the mapStateToProps for userRoles', () => {
        const initialState = {
            userRoles:{},
            error: null
        };
        expect(mapStateToProps(initialState).userRoles).toEqual({});
    });
});