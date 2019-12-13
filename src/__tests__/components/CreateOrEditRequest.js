/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import CreateOrEditRequestComponent ,{ CreateorEditRequest } from '../../components/CreateOrEditRequest';

const mockedStore = configureStore([thunk]);
let wrapper;

const initialState = {
    oneWayTrip: false,
    returnTrip: false,
    multiCityTrip: false,
    id: '',
    request: '',
    updating: false,
    autofillInfo: '',
    autofill: ''
};

describe('Create a Trip Request', () => {
    beforeEach(() => {
        wrapper = shallow(<CreateorEditRequest getProfile={jest.fn()} history={{ push: jest.fn() }} toggleUpdating={jest.fn()} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should start a one-way trip update', () => {
        wrapper.find('Button[ButtonId="oneWayTrip"]').props().onClick({ target: { id: 'oneWayTrip' } });
        expect(wrapper.instance().state.oneWayTrip).toEqual(true);
    });

    it('should start a return trip update', () => {
        wrapper.find('Button[ButtonId="returnTrip"]').props().onClick({ target: { id: 'returnTrip' } });
        expect(wrapper.instance().state.returnTrip).toEqual(true);
    });

    it('should start a multi-city trip update', () => {
        wrapper.find('Button[ButtonId="multiCityTrip"]').props().onClick({ target: { id: 'multiCityTrip' } });
        expect(wrapper.instance().state.multiCityTrip).toEqual(true);
    });
});

describe('Update a Trip Request', () => {
    beforeEach(() => {
        wrapper = shallow(<CreateorEditRequest updating getProfile={jest.fn()} history={{ push: jest.fn() }} toggleUpdating={jest.fn()} request={{ data: {}, type: 'x' }} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });
});

describe('Test Autofill', () => {
    beforeEach(() => {
        wrapper = shallow(<CreateorEditRequest getProfile={jest.fn()} history={{ push: jest.fn() }} toggleUpdating={jest.fn()} request={{ data: {}, type: 'x' }} />);
    });

    it('should receive profile info with passport name', () => {
        wrapper.setProps({
            profile: {
                status: 'fetch_success',
                data: {
                    passportName: 'x',
                    requestAutofill: true
                }
            }
        });
        expect(wrapper.state()).toHaveProperty('autofill', true);
    });

    it('should receive profile info with passport number', () => {
        wrapper.setProps({
            profile: {
                status: 'fetch_success',
                data: {
                    passportNumber: 'x',
                    requestAutofill: true
                }
            }
        });
        expect(wrapper.state()).toHaveProperty('autofill', true);
    });

    it('should receive profile info with gender', () => {
        wrapper.setProps({
            profile: {
                status: 'fetch_success',
                data: {
                    gender: 'x',
                    requestAutofill: true
                }
            }
        });
        expect(wrapper.state()).toHaveProperty('autofill', true);
    });

    it('should redirect on server error', () => {
        wrapper.setProps({
            profile: {
                error: 'Server error'
            }
        });
        expect(wrapper.state()).toEqual(initialState);
    });

    it('should redirect on unauthenticated user', () => {
        wrapper.setProps({
            profile: {
                error: 'Invalid or expired token used'
            }
        });
        expect(wrapper.state()).toEqual(initialState);
    });

    it('should display an error on profile fetch error', () => {
        wrapper.setProps({
            profile: {
                status: 'fetch_error',
                error: 'x'
            }
        });
        expect(wrapper.state()).toEqual(initialState);
    });
});

describe('Test mapStateToProps', () => {
    beforeEach(() => {
        const store = mockedStore({
            profile: {
                status: '',
                data: '',
                error: ''
            }
        });
        wrapper = shallow(<CreateOrEditRequestComponent store={store} getProfile={jest.fn()} history={{ push: jest.fn() }} toggleUpdating={jest.fn()} request={{ data: {}, type: 'x' }} />);
    });

    it('should render the componet', () => {
        expect(wrapper).toHaveLength(1);
    });
});