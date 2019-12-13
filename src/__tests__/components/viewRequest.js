/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ViewRequestComponent, { ViewRequest } from '../../components/ViewRequest';
import mockedRequest from '../../__mocks__/request';

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
            }, cancelBooking: {
                data: null,
                error: null
            }
        });
        wrapperMount = mount(<ViewRequestComponent store={store} cancelBooking={{data: null, error: null}} cancelBookingAction={jest.fn()} getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: 1 } }} deleteRequest={jest.fn()} />);
        wrapper = shallow(<ViewRequest  cancelBooking={{data: null, error: null}} cancelBookingAction={jest.fn()} getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: 1 } }} deleteRequest={jest.fn()} />);
        wrapperNoId = shallow(<ViewRequest  cancelBooking={{data: null, error: null}} cancelBookingAction={jest.fn()} getSingleRequest={jest.fn()} history={{ push: jest.fn() }} match={{ params: { id: '' } }} />);
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

    // BOOKING
    it('display a book button', () => {
        const state = {
            request: {
                id: 1,
                status: 'Approved',
                booked: false
            },
            booking: false,
            showCancel: false,
            cancelling: false,
        };
        wrapper.setState(state);
        const button = wrapper.find('[ButtonId="start-booking"]');
        expect(button).toHaveLength(1);
    });

    it('display a cancel booking button', () => {
        const state = {
            request: {
                id: 1,
                status: 'Approved',
                booked: true
            },
            booking: false,
            showCancel: false,
            cancelling: false,
        };
        wrapper.setState(state);
        const button = wrapper.find('[ButtonId="cancel-booking"]');
        expect(button).toHaveLength(1);
    });

    it('should render the book room page', ()=>{
        const state = {
            booking: true
        };
        wrapper.setState(state);
        const container = wrapper.find('.full-width');
        expect(container).toHaveLength(1);
    });
});

describe('booking tests', ()=> {
    const render = (params, fn=mount) => {
        const defaultProps = {
            cancelBooking:{data: null, error: null},
         cancelBookingAction:jest.fn(),
        getSingleRequest:jest.fn(),
        history: { push: jest.fn() },
        match:{ params: { id: 1 } },
        deleteRequest: jest.fn() 
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<ViewRequest {...props }/>);
    };
    it('should handle toogle booking', () =>{
        const wraper = render({}, shallow);
        mockedRequest.status = 'Approved';
        const state = {
            request: mockedRequest,   
            booking: false,
            showCancel: false,
            cancelling: false,
        };
        wraper.setState({...wraper.instance().state, ...state});
        const button = wraper.find('[ButtonId="start-booking"]');
        button.simulate('click');
        expect(wraper.instance().state.booking).toBe(true);
    });

    it('should handle toogle cancel on cancel booking', () =>{
        const wraper = render({}, shallow);
        mockedRequest.status = 'Approved';
        mockedRequest.booked = true;
        const state = {
            request: mockedRequest,   
            booking: false,
            showCancel: false,
            cancelling: false,
        };
        wraper.setState({...wraper.instance().state, ...state});
        const button = wraper.find('[ButtonId="cancel-booking"]');
        button.simulate('click');
        expect(wraper.instance().state.showCancel).toBe(true);
    });

    it('should handle confirmcancel booking', () =>{
        const wraper = render({}, shallow);
        mockedRequest.status = 'Approved';
        mockedRequest.booked = true;
        const state = {
            request: mockedRequest,   
            booking: false,
            showCancel: false,
            cancelling: false,
        };
        wraper.setState({...wraper.instance().state, ...state});
        const button = wraper.find('[ButtonId="cancel-booking"]');
        button.simulate('click');
        // eslint-disable-next-line no-unused-vars
        const Modal = wraper.find('Modal').props().confirm();
        expect(wraper.instance().state.showCancel).toBe(false);
    });
});

describe('cancel bookign', () => {
    const render = (params, fn=mount) => {
        const defaultProps = {
            cancelBooking:{data: null, error: null},
         cancelBookingAction:jest.fn(),
        getSingleRequest:jest.fn(),
        history: { push: jest.fn() },
        match:{ params: { id: 1 } },
        deleteRequest: jest.fn() 
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<ViewRequest {...props }/>);
    };

    it('should handle successfull cancel', ()=>{
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: {message: 'success message'}, error: null}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledTimes(0);
    });

    it('should handle 401 error from server', ()=>{
        window.localStorage.removeItem =  () => jest.fn();
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: null, error: {message: 'error message', status: 401}}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/login');
    });

    it('should handle 404 error from server', ()=>{
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: null, error: {message: 'error message', status: 404}}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledTimes(0);
    });

    it('should handle 403 error from server', ()=>{
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: null, error: {message: 'error message', status: 403}}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/dashboard');
    });
    it('should handle 500 error from server', ()=>{
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: null, error: {message: 'error message', status: 500}}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/500');
    });

    it('should connection error', ()=>{
        const wraper = render();
        wraper.setProps({request: mockedRequest, cancelBooking: {data: null, error: {message: 'error message', status: 501}}});
        const {history} = wraper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/dashboard');
    });
});


