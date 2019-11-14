/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import OneWayComponent, { OneWayRequest } from '../../components/OneWayRequest';

const mockedStore = configureStore([thunk]);

let wrapper;
let wrapperMount;

describe('Request One Way Trip', () => {
    beforeEach(() => {
        const store = mockedStore({
            request: {
                status: '',
                locations: '',
                message: '',
                error: ''
            }
        });
        wrapperMount = mount(<OneWayComponent store={store} getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} />);
        wrapper = shallow(<OneWayRequest  getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('render the component', () => {
        expect(wrapperMount).toHaveLength(1);
    });

    it('should test fetch locations', () => {
        const props = { request: {
            status: 'fetch_locations_success',
            locations: [
                {
                    id : 1,
                    country: 'Rwanda',
                    city: 'Kigali',
                    Accommodations: []
                },
                {
                    id : 2,
                    country: 'Uganda',
                    city: 'Kampala',
                    Accommodations: []
                }
            ]
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should test request trip success', () => {
        const props = { request: {
            status: 'request_success'
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should test request trip error', () => {
        const props = { request: {
            status: 'request_error',
            error: ''
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should trigger creating a request', () => {
        const state = {
            from: 'Lagos, Nigeria',
            location: 1,
            travelDate: '2020-02-20',
            accommodation: 'X',
            reason : 'Travel reason has to ba atleast 30 characters long',
            passportName: 'passportName',
            passportNumber: 'passportNumber',
            gender: 'MALE',
            error: '',
            possibleLocations: [
                {
                    id : 1,
                    country: 'Rwanda',
                    city: 'Kigali',
                    Accommodations: [{
                        name: 'X'
                    }]
                },
                {
                    id : 2,
                    country: 'Uganda',
                    city: 'Kampala',
                    Accommodations: []
                }
            ],
            updating: false,
            id: '',
            markup: '',
            submitting: false
        };
        wrapper.setState(state);
        wrapper.find('Button[ButtonId="submit-request"]').props().onClick();
        expect(wrapper.instance().state).toHaveProperty('submitting');
    });

    it('should trigger error for empty fields', () => {
        const state = {
            from: 'Lagos, Nigeria',
            location: 1,
            travelDate: '2020-02-20',
            accommodation: 'X',
            reason : '',
            passportName: 'passportName',
            passportNumber: 'passportNumber',
            gender: 'MALE',
            error: '',
            possibleLocations: [
                {
                    id : 1,
                    country: 'Rwanda',
                    city: 'Kigali',
                    Accommodations: [{
                        name: 'X'
                    }]
                },
                {
                    id : 2,
                    country: 'Uganda',
                    city: 'Kampala',
                    Accommodations: []
                }
            ],
            updating: false,
            id: '',
            markup: '',
            submitting: false
        };
        wrapper.setState(state);
        wrapper.find('Button[ButtonId="submit-request"]').props().onClick();
        expect(wrapper.instance().state).toHaveProperty('error');
    });
});

describe('Update Trip Request', () => {
    beforeEach(() => {
        const store = mockedStore({
            request: {
                status: '',
                locations: '',
                message: '',
                error: ''
            }
        });
        wrapperMount = mount(<OneWayComponent store={store} getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} updating currentRequest={{ reason: '' }} toggleUpdating={jest.fn()} updateRequest={jest.fn()} />);
        wrapper = shallow(<OneWayRequest  getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} updating currentRequest={{ reason: '' }} toggleUpdating={jest.fn()} updateRequest={jest.fn()} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('render the component', () => {
        expect(wrapperMount).toHaveLength(1);
    });

    it('should test update request success', () => {
        const props = { request: {
            status: 'update_request_success'
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should test update request error', () => {
        const props = { request: {
            status: 'update_request_error'
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should test no action', () => {
        const props = { request: {
            status: 'xxx'
        }};
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('request', props.request);
    });

    it('should test stop updating', () => {
        wrapperMount.find('#stop-updating').simulate('click');
        expect(wrapperMount.props()).toHaveProperty('updating');
    });

    it('should test set locations in state', () => {
        const state = {
            location: 1,
            accommodation: 'a',
            possibleLocations: [
                {
                    id : 1,
                    name: 'a',
                    Accommodations: [
                        {
                            name: 'a',
                            imageUrl: ''
                        },
                        {
                            name: '',
                            imageUrl: ''
                        }
                ]
                },
                {
                    id : 2,
                    name: '',
                    Accommodations: []
                }
            ]
        };
        wrapper.setState(state);
        expect(wrapper.instance().state).toHaveProperty('possibleLocations', state.possibleLocations);
    });

    it('should test selecting accommodation from image', () => {
        const state = {
            location: 1,
            possibleLocations: [
                {
                    id : 1,
                    name: 'a',
                    Accommodations: [
                        {
                            name: '',
                            imageUrl: ''
                        },
                        {
                            name: '',
                            imageUrl: ''
                        }
                ]
                },
                {
                    id : 2,
                    name: '',
                    Accommodations: []
                }
            ]
        };
        wrapper.setState(state);
        wrapper.find('#accommodation-image-1').simulate('click');
        expect(wrapper.instance().state).toHaveProperty('possibleLocations', state.possibleLocations);
    });

    it('should test error showing', () => {
        const state = {
            error: 'error'
        };
        wrapper.setState(state);
        expect(wrapper.instance().state).toHaveProperty('error', state.error);
    });

    it('should trigger updating a request', () => {
        const state = {
            from: 'Lagos, Nigeria',
            location: 1,
            travelDate: '2020-02-20',
            accommodation: 'X',
            reason : 'Travel reason has to ba atleast 30 characters long',
            passportName: 'passportName',
            passportNumber: 'passportNumber',
            gender: 'MALE',
            error: '',
            possibleLocations: [
                {
                    id : 1,
                    country: 'Rwanda',
                    city: 'Kigali',
                    Accommodations: [{
                        name: 'X'
                    }]
                },
                {
                    id : 2,
                    country: 'Uganda',
                    city: 'Kampala',
                    Accommodations: []
                }
            ],
            updating: true,
            id: '',
            markup: '',
            submitting: false
        };
        wrapper.setState(state);
        wrapper.find('Button[ButtonId="submit-request"]').props().onClick();
        expect(wrapper.instance().state).toHaveProperty('submitting');
    });
});
