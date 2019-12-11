/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Enzyme from '../../config/enzyme.config';
import SignUpPage, {SignUpPage as SignupPage} from '../../components/signupPage';

const mount = Enzyme.mount;
const mockedStore = configureStore([thunk]); 

describe('signUp', () => {

 describe('Unit tests', ()=>{
    const render = (params, fn=mount) => {
        const defaultProps = {
            history: {},
            user: {},
            push: jest.fn(),
            signup: jest.fn()

        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<SignupPage {...props }/>);
    };

    it('should render the signup page', () => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
    });
    it('should render the signup page', () => {
        localStorage.setItem('bareFootToken', 'token');
        const wrapper = render();
        localStorage.removeItem('bareFootToken', 'token');
        expect(wrapper).toHaveLength(1);
    });
    it('should handle the validations', () => {
        const wrapper = render();
        const mainInput = wrapper.find("[name='firstName']");
        const firstName = mainInput.find("input[name='firstName']");
        firstName.simulate('change', { target: { value: 'ba' } });
        const pError = mainInput.find('.form-error'); 
        expect(pError).toHaveLength(1);
    });
    it('should submit a form with all info', () => {
        const wrapper = render();
        wrapper.instance().state = { 
            errors: {
                name: undefined,
                age: undefined
            },    
            firstName: 'name1',
            lastName: 'name2',
            userEmail: 'bahati.robben@gmail.com',
            userPassword: 'Root1123#',
            confirm: "Root1123#"};
        wrapper.setProps({signup: jest.fn()});

        const form = wrapper.find('.signup-form'); 
        const event = { preventDefault: jest.fn() };
        form.simulate('submit', event);
        const {signup} = wrapper.instance().props; 
        expect(signup).toHaveBeenCalledWith(wrapper.instance().state);
    }); 
    it('should handle non matching password', () => {
        const wrapper = render();

        const confirm = wrapper.find('input[name="confirm"]');
        confirm.simulate('change', {target: {name: 'confirm', value: 'Roo$#'}});
        expect(confirm).toHaveLength(1); 
    }); 
    it('simulate successfull signUp', () => {
        const wrapper = render();
        wrapper.setProps({history: {push: jest.fn()}, user: {data: 'dummy data'}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/call4verify'); 
    }); 
    it('simulate unsuccessfull signUp', () => {
        const wrapper = render();
        wrapper.setProps({history: {push: jest.fn()}, user: {data: null}});
        const {push} = wrapper.instance().props.history;
        const button = wrapper.find('.signup-btn');
        expect(button.text()).toEqual('Sign Up');
        expect(push).toHaveBeenCalledTimes(0);

    }); 
 }); 
 
 describe('integration tests', () => {
    const render = (params, fn=mount) => {
        const defaultProps = {
            history: {},
            user: {},
            push: jest.fn(),
            signup: jest.fn()

        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<SignUpPage {...props }/>);
    };
    const store= mockedStore({
        user: {
            data: null,
            error: null
        }
    });
    it('should render the signUp page', () => {
        const wrapper = render({store});
        expect(wrapper).toHaveLength(1);
    });
 });
});