/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {  mount } from 'enzyme';
// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';
import { mostTravelled, trips } from "../../__mocks__/dashboard";
import DashboardPage from "../../components/DashboardPage";

// const mockedStore = configureStore([thunk]);


describe('DashboardPage Should Render', ()=>{
    const render = (params, fn=mount) => {
        const defaultProps = {
            destination: {destinations: [mostTravelled], count: 2},
            trips: {total: 2, trips} ,
            computePeriod: jest.fn(),
            updateInput: jest.fn(),

        };
            const props = {...defaultProps, ...params };
            return fn(<DashboardPage {...props }/>);
        };

    it('Should render the DashboardPage', done =>{
        const wrapper = render();
        expect(wrapper).toHaveLength(1);

        done();
    });
});


