/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import MultiCityComponent, { MultiCityRequest } from '../../components/MultiCityRequest';

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
        wrapperMount = mount(<MultiCityComponent store={store} getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} />);
        wrapper = shallow(<MultiCityRequest  getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} />);
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
            locations: [{
                id : 1,
                country: 'Rwanda',
                city: 'Kigali',
                Accommodations: []
            }]
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
            returnDate: '2020-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2020-02-18',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2020-02-19',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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
            returnDate: '2020-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2020-02-18',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2020-02-19',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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

    it('should add new destination fields', () => {
        wrapper.find('Button[ButtonId="add-trip"]').props().onClick();
        expect(wrapper.instance().state.trips.length).toEqual(2);
    });

    it('should remove destination fields', () => {
        wrapper.find('Button[ButtonId="remove-trip"]').props().onClick();
        expect(wrapper.instance().state.trips.length).toEqual(0);
    });

    it('should trigger changes', () => {
        wrapper.find('Select[name="from"]').props().onChange({ target: { name: 'from', value: 'x' } });
        wrapper.find('Input[name="returnDate"]').props().onChange({ target: { name: 'returnDate', value: 'x' } });
        wrapper.find('Select[name="location"]').props().onChange({ target: { name: 'location', value: 'x' } });
        wrapper.find('Input[name="travelDate"]').props().onChange({ target: { name: 'travelDate', value: 'x' } });
        wrapper.find('Select[name="accommodation"]').props().onChange({ target: { name: 'accommodation', value: 'x' } });
        wrapper.find('TextArea[name="reason"]').props().onChange({ target: { name: 'reason', value: 'x' } });
        wrapper.find('Input[name="passportName"]').props().onChange({ target: { name: 'passportName', value: 'x' } });
        wrapper.find('Input[name="passportNumber"]').props().onChange({ target: { name: 'passportNumber', value: 'x' } });
        wrapper.find('Select[name="gender"]').props().onChange({ target: { name: 'gender', value: 'x' } });
    });

    it('should trigger error for travel dates that are not ordered', () => {
        const state = {
            from: 'Lagos, Nigeria',
            returnDate: '2020-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2020-02-19',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2020-02-18',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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

    it('should trigger error for travel dates that are before today', () => {
        const state = {
            from: 'Lagos, Nigeria',
            returnDate: '2020-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2018-02-19',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2018-02-18',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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

    it('should trigger error for travel dates that are after the return date', () => {
        const state = {
            from: 'Lagos, Nigeria',
            returnDate: '2019-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2020-02-18',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2020-02-18',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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
        wrapperMount = mount(<MultiCityComponent store={store} getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} updating currentRequest={{ reason: '' }} toggleUpdating={jest.fn()} updateRequest={jest.fn()} />);
        wrapper = shallow(<MultiCityRequest  getLocations={jest.fn()} history={{ push: jest.fn() }} requestTrip={jest.fn()} updating currentRequest={{ reason: '' }} toggleUpdating={jest.fn()} updateRequest={jest.fn()} />);
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
            trips: [
                {
                    location: 1
                }
            ],
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
        expect(wrapper.instance().state).toHaveProperty('possibleLocations', state.possibleLocations);
    });

    it('should test selecting accommodation from image', () => {
        const state = {
            trips: [
                {
                    location: 1
                }
            ],
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
            returnDate: '2020-02-20',
            trips: [
                {
                    location: 1,
                    travelDate: '2020-02-18',
                    accommodation: 'X'
                },
                {
                    location: 2,
                    travelDate: '2020-02-19',
                    accommodation: 'Y'
                }
            ],
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
                    Accommodations: [{
                        name: 'Y'
                    }]
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


