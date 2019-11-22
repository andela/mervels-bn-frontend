/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Enzyme from '../../config/enzyme.config';
import VerifyEmailPage, {VerifyPage} from '../../components/VerifyEmailPage';

const mount = Enzyme.mount;
const mockedStore = configureStore([thunk]);

describe("Verify Email component", () => {
    describe("Unit tests", () => {
        const render = (params, fn=mount) => {
            const defaultProps = {
                history: {push: jest.fn()},
                location: {search: 'https://localhost:1000/api/v1/?token=randeomtokenNumber'},
                verify: jest.fn(),
                verifyData: { data: null,
                    error: null},

            };
            const props = {...defaultProps, ...params };
            // eslint-disable-next-line import/no-named-as-default-member
            return fn(<VerifyPage {...props }/>);
        };


    it("should render successfully", () => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
    });

    it("should handle a link without a token", () => {
        const location = {
            search: 'https://localhost:1000/api/v1/?token=',
    };
    const wrapper = render({location});
    const {verify} = wrapper.instance().props; 
    expect(verify).toHaveBeenCalledTimes(0);
    });

    it("should load a spinner when there is result yet from the server", () => {
        const verifyData = {
            data: null,
            error: null,
        };
        const wrapper = render();
        const spinner = wrapper.find('div.spinner-center');
        expect(spinner).toHaveLength(1);
    });
    it("should handle successful verification", () => {
        const verifyData = {
            data: 'user token',
            error: null,
        };
        const wrapper = render();
        wrapper.setProps({verifyData});
        const spinner = wrapper.find('div.pinner-center');
        const {push} = wrapper.instance().props.history;
        expect(spinner).toHaveLength(0); 
        expect(push).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem('logged_in')).toEqual("true");
    });

    it("should handle the 401 error from the server", () => {
        const verifyData = {
            data: null,
            error: {status: 401},
        };
        const wrapper = render();
        wrapper.setProps({verifyData});
        const spinner = wrapper.find('div.pinner-center');
        const {push} = wrapper.instance().props.history;
        expect(spinner).toHaveLength(0); 
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith("/reverify"); 
    });
    
    it("should handle 500 error from server", () => {
        const verifyData = {
            data: null,
            error: {status: 500},
        };
        const wrapper = render();
        wrapper.setProps({verifyData});
        const spinner = wrapper.find('div.pinner-center');
        const {push} = wrapper.instance().props.history;
        const logo = wrapper.find('.barefoot-logo');
        expect(logo).toHaveLength(1);
        expect(spinner).toHaveLength(0); 
        expect(push).toHaveBeenCalledTimes(0);
    });

    it("should render successfully", () => {
        const verifyData = {
            data: null,
            error: {status: 501},
        };
        const wrapper = render();
        wrapper.setProps({verifyData});
        const spinner = wrapper.find('div.pinner-center');
        const {push} = wrapper.instance().props.history;
        const logo = wrapper.find('.barefoot-logo');
        expect(logo).toHaveLength(1);
        expect(spinner).toHaveLength(0); 
        expect(push).toHaveBeenCalledTimes(0);
    });

    it("should handle 409 from server and redirect to login", () => {
        const verifyData = {
            data: null,
            error: {status: 409},
        };
        const wrapper = render();
        wrapper.setProps({verifyData});
        const spinner = wrapper.find('div.pinner-center');
        const {push} = wrapper.instance().props.history;
        expect(spinner).toHaveLength(0); 
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith("/login");  
    });
    });
});