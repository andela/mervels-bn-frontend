/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Enzyme from '../../../config/enzyme.config';
import TravelDetails from '../../../components/shared/TravelDetails';
import request from '../../../__mocks__/request';
import requestTwo from '../../../__mocks__/request2';

const mount = Enzyme.mount;
const mockedStore = configureStore([thunk]);

describe("ReVerify Email component", () => {
    describe("Unit tests", () => {
        it("should render successfully", () => {
            const render = (params, fn=mount) => {
                const defaultProps = {
                    request
                };
                const props = {...defaultProps, ...params };
                // eslint-disable-next-line import/no-named-as-default-member
                return fn(<TravelDetails {...props }/>);
            };
            const wrapper = render();
            const page = wrapper.find('.req-details');
            expect(page).toHaveLength(1);
            expect(wrapper).toHaveLength(1); 
        });  
        it("should render successfully - two", () => {
            const render = (params, fn=mount) => {
                const defaultProps = {
                    request: requestTwo
                };
                const props = {...defaultProps, ...params };
                // eslint-disable-next-line import/no-named-as-default-member
                return fn(<TravelDetails {...props }/>);
            };
            const wrapper = render();
            const page = wrapper.find('.req-details');
            expect(page).toHaveLength(1);
            expect(wrapper).toHaveLength(1); 
        });  
    });
});