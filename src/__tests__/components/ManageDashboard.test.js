/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from "enzyme";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ManageDashboard,  { ManageDashboard as Dashboard } from "../../components/ManageDashboard";
import { mostTravelled, trips } from "../../__mocks__/dashboard";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Manage Dashboard Page', ()=>{
    it('Tests to render Manage Profile with no Store', (done)=>{
        const props = {
            getMostTravelled: jest.fn(),
            getTrips: jest.fn()
        };
        const wrapper = shallow( <Dashboard {...props}  />);
        expect(wrapper).toHaveLength(1);
        done();
    });
});

describe('with store', ()=>{
    let store ;

    beforeEach(()=>{
         store = mockStore({
             dashboard: {
                mostTravelled: {count: 1, destinations: [mostTravelled] },
                tripStats: {total: 2, trips }
             }
        });
    });
    it('Renders ManageDashboard' , (done)=>{
        const props = {
            getMostTravelled: jest.fn(),
            getTrips: jest.fn()
        };
        const wrapper = mount( <ManageDashboard
            store={store}
            {...props}
            />);
        expect(wrapper).toHaveLength(1);
        done();
    });

    it('Simulate change on value on select and input on Dashboard Page', done =>{
        const props = {
            getMostTravelled: jest.fn(),
            getTrips: jest.fn()
        };
        const wrapper = mount( <ManageDashboard
            store={store}
            {...props}
            />);

        wrapper.find('Input[name="value"]').simulate('change',
        { target: { name: 'value', value: 1 }, persist: jest.fn() });
        expect(wrapper).toHaveLength(1);
        done();
    });
    it('Simulate button click to compute Dashboard Page', done =>{
        const props = {
            getMostTravelled: jest.fn(),
            getTrips: jest.fn()
        };
        const wrapper = mount( <ManageDashboard
            store={store}
            {...props}
            />);

        wrapper.find('#compute').simulate('click');
        expect(wrapper).toHaveLength(1);
        done();
    });
});