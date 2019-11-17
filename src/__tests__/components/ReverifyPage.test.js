/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Enzyme from '../../config/enzyme.config';
import Reverify, {ReverifyPage} from '../../components/ReverifyPage';

const mount = Enzyme.mount;
const mockedStore = configureStore([thunk]);

describe("ReVerify Email component", () => {
    describe("Unit tests", () => {
        const render = (params, fn=mount) => {
            const defaultProps = {
                history: {push: jest.fn()},
                reverify: jest.fn(), 
                reverifyData: { data: null,
                    error: null},

            };
            const props = {...defaultProps, ...params };
            // eslint-disable-next-line import/no-named-as-default-member
            return fn(<ReverifyPage {...props }/>);
        };


    it("should render successfully", () => {
        const wrapper = render();
        const page = wrapper.find('.reverify-page');
        expect(page).toHaveLength(1);
        expect(wrapper).toHaveLength(1); 
    });

    it("should handle the submission", () => {
        const wrapper = render();
        const event = { preventDefault: jest.fn() };
        const form = wrapper.find('.reverify-form');
        form.simulate('submit', event);
        const {reverify} = wrapper.instance().props;
    expect(reverify).toHaveBeenCalledTimes(1);
    });

    it("handle form change",  () => {
        const wrapper = render();
        const input = wrapper.find('input[name="userEmail"]');
        input.simulate('change', {target: {name: 'userEmail', value: "barefoot@nomad.com"}});
        const state= wrapper.instance().state; 
        expect(state.userEmail).toEqual('barefoot@nomad.com');
    });
    it("should handle successful reverification", () => {
        const reverifyData = {
            data: 'user token',
            error: null,
        };
        const wrapper = render();
        wrapper.setProps({reverifyData});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith('/call4verify');
    });

    it("should handle the 404 error from the server", () => {
        const reverifyData = {
            data: null,
            error: {status: 404},
        }; 
        const wrapper = render(); 
        wrapper.setProps({history: {push: jest.fn()} , reverifyData});
        const {push} = wrapper.instance().props.history; 
        const button = wrapper.find('button');
        expect(button.text()).toEqual('Send');
        expect(push).toHaveBeenCalledTimes(0);
    });
    
    it("should handle the 404 error from the server", () => {
        const reverifyData = {
            data: null,
            error: {status: 500},
        }; 
        const wrapper = render(); 
        wrapper.setProps({history: {push: jest.fn()} , reverifyData});
        const {push} = wrapper.instance().props.history; 
        const button = wrapper.find('button');
        expect(button.text()).toEqual('Send');
        expect(push).toHaveBeenCalledTimes(0);
    });

    it("should handle the 404 error from the server", () => {
        const reverifyData = {
            data: null,
            error: {status: 501},
        }; 
        const wrapper = render(); 
        wrapper.setProps({history: {push: jest.fn()} , reverifyData});
        const {push} = wrapper.instance().props.history; 
        const button = wrapper.find('button');
        expect(button.text()).toEqual('Send');
        expect(push).toHaveBeenCalledTimes(0);
    });
    
     });


    describe("Integration tests", () => {
        const render = (params, fn=mount) => {
            const defaultProps = {
                history: {push: jest.fn()},
                reverify: jest.fn(), 
                reverifyData: { data: null,
                    error: null},

            };
            const props = {...defaultProps, ...params };
            // eslint-disable-next-line import/no-named-as-default-member
            return fn(<Reverify {...props }/>);
        };
        const store= mockedStore({
            reverifyData: {
                data: null,
                error: null
            }
        });
        it('should render the verify component', () => {
            const wrapper = render({store});
            expect(wrapper).toHaveLength(1);
        });
     });
});