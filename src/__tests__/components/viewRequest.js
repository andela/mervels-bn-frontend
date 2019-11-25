/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ViewRequestComponent, { ViewRequest } from '../../components/ViewRequest';

const mockedStore = configureStore([thunk]);

let wrapper;
let wrapperNoId;
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
        wrapperMount = mount(<ViewRequestComponent store={store} getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: 1 } }} deleteRequest={jest.fn()} />);
        wrapper = shallow(<ViewRequest  getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: 1 } }} deleteRequest={jest.fn()} />);
        wrapperNoId = shallow(<ViewRequest  getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: '' } }} />);
    });

    it('render component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('render component', () => {
        expect(wrapperNoId).toHaveLength(1);
    });

    it('render the component', () => {
        expect(wrapperMount).toHaveLength(1);
    });

    it('should delete a request', () => {
        const state = {
            request: {
                id: 1
            },
            showModal: true
        };
        wrapper.setState(state);
        wrapper.find('Modal').props().confirm();
        expect(wrapper.find('Modal').length).toEqual(1);
    });

    it('should close modal', () => {
        const state = {
            request: {
                id: 1
            },
            showModal: true
        };
        wrapper.setState(state);
        wrapper.find('Modal').props().closeModal();
        expect(wrapper.find('Modal').length).toEqual(0);
    });

    it('should show delete and update buttons', () => {
        const state = {
            request: {
                id: 1,
                status: 'Pending'
            }
        };
        wrapper.setState(state);
        expect(wrapper.find('Button[ButtonId="start-updating"]').length).toEqual(1);
        expect(wrapper.find('Button[ButtonId="delete"]').length).toEqual(1);
    });

    it('should start updating', () => {
        const state = {
            request: {
                id: 1,
                status: 'Pending'
            },
            showModal: true
        };
        wrapper.setState(state);
        wrapper.find('Button[ButtonId="start-updating"]').props().onClick();
        expect(wrapper.find('Connect(CreateorEditRequest)').length).toEqual(1);
    });

    it('should stop updating', () => {
        const state = {
            request: {
                id: 1,
                status: 'Pending'
            },
            showModal: true,
            updating: true
        };
        wrapper.setState(state);
        wrapper.find('Connect(CreateorEditRequest)').props().toggleUpdating();
        expect(wrapper.find('Connect(CreateorEditRequest)').length).toEqual(0);
    });

    it('should test successful request retrieval - one way', () => {
        const props = {
            request: {
                status: 'fetch_request_success',
                data: [{
                    travelDate: [''],
                    accommodations: [{
                        name: '',
                        Location: {
                            id: 1
                        }
                    }]
                }]
            }
        };
        wrapper.setProps(props);
        expect(wrapper.state().formattedRequest.type).toEqual('oneWayTrip');
    });

    it('should test successful request retrieval - return trip', () => {
        const props = {
            request: {
                status: 'fetch_request_success',
                data: [{
                    travelDate: [''],
                    returnDate: 'x',
                    accommodations: [{
                        name: '',
                        Location: {
                            id: 1
                        }
                    }]
                }]
            }
        };
        wrapper.setProps(props);
        expect(wrapper.state().formattedRequest.type).toEqual('returnTrip');
    });

    it('should test successful request retrieval - multi city trip', () => {
        const props = {
            request: {
                status: 'fetch_request_success',
                data: [{
                    travelDate: ['', ''],
                    returnDate: 'x',
                    accommodations: [
                        {
                            name: '',
                            Location: {
                                id: 1
                            }
                        },
                        {
                            name: '',
                            Location: {
                                id: 2
                            }
                        }
                    ]
                }]
            }
        };
        wrapper.setProps(props);
        expect(wrapper.state().formattedRequest.type).toEqual('multiCityTrip');
    });

    it('should test unsuccessful request retrieval', () => {
        const props = {
            request: {
                status: 'fetch_request_error',
                error: ''
            }
        };
        wrapper.setProps(props);
    });

    it('should test successful request deletion', () => {
        const props = {
            request: {
                status: 'delete_request_success',
                message: ''
            }
        };
        wrapper.setProps(props);
        expect(wrapper).toHaveLength(1);
    });

    it('should test unsuccessful request deletion', () => {
        const props = {
            request: {
                status: 'delete_request_error',
                error: ''
            }
        };
        wrapper.setProps(props);
        expect(wrapper.state().showModal).toEqual(false);
    });

    it('should test `no action triggerred`', () => {
        const props = {
            request: {
                status: 'x'
            }
        };
        wrapper.setProps(props);
        expect(wrapper).toHaveLength(1);
    });
});

