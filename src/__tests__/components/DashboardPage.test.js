/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {  mount } from 'enzyme';
// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';
import { mostTravelledRating, mostTravelledNoRating,trips } from "../../__mocks__/dashboard";
import DashboardPage from "../../components/DashboardPage";

// const mockedStore = configureStore([thunk]);


describe('DashboardPage Should Render', ()=>{
    const render = (destination, params, fn=mount) => {
        const defaultProps = {
            destination: {destinations: [destination], count: 2},
            trips: {total: 2, trips} ,
            computePeriod: jest.fn(),
            updateInput: jest.fn(),

        };
            const props = {...defaultProps, ...params };
            return fn(<DashboardPage {...props }/>);
        };

    it('Should render the DashboardPage', done =>{
        const wrapper = render(mostTravelledRating);
        expect(wrapper).toHaveLength(1);

        done();
    });

    it('Should render the DashboardPagejhkjhjkhk', done =>{
        const wrapper = render(mostTravelledNoRating);
        console.log(wrapper.instance().props);
        expect(wrapper).toHaveLength(1);
        done();
    });
});


