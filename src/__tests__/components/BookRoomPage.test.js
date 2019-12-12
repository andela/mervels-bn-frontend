/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme from '../../config/enzyme.config';
import BookRoom, {BookRoom as UnconnectedBookRoom} from '../../components/BookRoomPage';
import request from '../../__mocks__/request';

const {mount} = Enzyme;
const {shallow} = Enzyme;
const mockedStore = configureStore([thunk]);


describe('Unit tests', ()=>{
 


    const render = (params, fn=shallow) => {
        const defaultProps = {
            history: {push: jest.fn()},
            request: {data: [request]},
            classes: '',
            getAccommodations: jest.fn(),
            Allaccommodations: {accommodations: [{name: 'SHERATON', status: 'Available', id: 1, locationId: 1}]},
            user: '',
            getRooms: jest.fn(),
            allRooms: {data: [{status: 'Available', name: 'MASSAIMARA', id: 1, accommodationId: 1}]},
            toggleBooking: jest.fn(),
            bookRoom: {},
            bookedroom: jest.fn(),

        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<UnconnectedBookRoom {...props }/>);
    };

    it('should render the page successfully', () => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
    });

    it('should handle successfull booking of room', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {data: {status: 200, message: 'success message'}, error: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/requests');
    });

    it('should handle validation errors', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 422, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledTimes(0);
    });

    it('should handle 401 errors', () => {
        window.localStorage.removeItem = () => jest.fn();
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 401, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/login');
    });

    it('should handle 403 errors', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 403, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/dashboard');
    });

    it('should handle 404 errors', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 404, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/requests');
    });

    it('should handle 409 errors', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 409, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/requests');
    });

    it('should handle 500 and other errors', () => {
        const wrapper = render();
        wrapper.setProps({bookedroom: {error: {status: 500, message: 'error message'}, data: null}});
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledTimes(0);
    });
    it('should handle cancel and go the previous page', () => {
        const wrapper = render();
        wrapper.setProps({handleCancel: jest.fn()});
        const cancelButton = wrapper.find('#cancel-booking');
        cancelButton.simulate('click');
        const {toggleBooking} = wrapper.instance().props;
        expect(toggleBooking).toHaveBeenCalledTimes(1);
    });

    it("should handle focus on a specific trip", () => {
        const wrapper = render();
        wrapper.setProps({handleFocus: jest.fn()});
        wrapper.setState({activeLocation: 2});
        const BookCard = wrapper.find("BookCard").props().handleFocus(1, [{name: 'SHERATON', id: 1, url: 'noUrl'}]);
        const {possibleAccommodations} = wrapper.instance().state;
        expect(possibleAccommodations).toStrictEqual([{"id": 1, "name": "SHERATON", "url": "noUrl"}]);
    });

    it("should handle focus on a specific trip when there is no focus change", () => {
        const wrapper = render();
        wrapper.setProps({handleFocus: jest.fn()});
        wrapper.setState({activeLocation: 1});
        const BookCard = wrapper.find("BookCard").props().handleFocus(1, [{name: 'SHERATON', id: 1, url: 'noUrl'}]);
        expect(wrapper.state).not.toHaveProperty('possibleAccommodations');
    });

    it("should handle selecting accommodations by clicking on accommodations images", () => {
        const wrapper = render();
        wrapper.setState({activeLocation: 1, trips: [{location: {id: 3}}, {location:{id: 1}}], possibleAccommodations: [{name: 'SHERATON', id: 1, url: 'noUrl'}]});
        const accommodationCard = wrapper.find('accommodationCard').props().handleImageClick(1, 'SHERATON');
        expect(wrapper.instance().state.trips[1].accommodation).toStrictEqual('SHERATON');
    });

    it("should handle selecting accommodations by clicking on accommodations images at the first try when active location is undefined", () => {
        const wrapper = render();
        wrapper.setState({activeLocation: undefined, trips: [{location:{id: 1}}, {location: {id: 3}}], possibleAccommodations: [{name: 'SHERATON', id: 1, url: 'noUrl'}]});
        const accommodationCard = wrapper.find('accommodationCard').props().handleImageClick(1, 'SHERATON');
        expect(wrapper.instance().state.activeLocation).toBe(1);
    });

    it("should handle Submitting with errors errors", ()=>{
        const wrapper = render();
        const button = wrapper.find('#submit-booking');
        button.simulate('click');
        expect(wrapper.instance().state.error.class).toEqual('visible');
    });

    it("should not submit if checkin Date is not within two days after travel date", ()=>{
        const wrapper = render();
        const trips = [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-05', returnDate: '2020-01-03'}];
        const props = {bookRoom: jest.fn(), request: {data:[{ id: 1}]}};
        wrapper.setProps({...props});
        wrapper.setState({trips});
        const button = wrapper.find('#submit-booking');
        button.simulate('click');
        expect(wrapper.instance().state.error).toStrictEqual({details: 'You must checkin within 2 days after travel date', class: 'visible'});
    });

    it("should not submit if checout Date is after return date", ()=>{
        const wrapper = render();
        const trips = [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-05-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-02', returnDate: '2020-01-03'}];
        const props = {bookRoom: jest.fn(), request: {data:[{ id: 1}]}};
        wrapper.setProps({...props});
        wrapper.setState({trips});
        const button = wrapper.find('#submit-booking');
        button.simulate('click');
        expect(wrapper.instance().state.error).toStrictEqual({details: 'Checkout dates must be before the return Date', class: 'visible'});
    });

    it("should not submit if checout Date is after return date", ()=>{
        const wrapper = render();
        const trips = [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-05-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-02', returnDate: '2020-01-03'},
        {location: {id:1},  checkIn: '2019-04-03', checkOut: '2020-06-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-04-02', returnDate: '2020-06-03'}];
        const props = {bookRoom: jest.fn(), request: {data:[{ id: 1}]}};
        wrapper.setProps({...props});
        wrapper.setState({trips});
        const button = wrapper.find('#submit-booking');
        button.simulate('click');
        expect(wrapper.instance().state.error).toStrictEqual({details: 'Check in dates must be later than the checkout date of Previous accommodation', class: 'visible'});
    });

    it("should submit without errors", ()=>{
        const wrapper = render();
        const trips = [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-01', returnDate: '2020-01-03'}];
        const props = {bookRoom: jest.fn(), request: {data:[{ id: 1}]}};
        wrapper.setProps({...props});
        wrapper.setState({trips});
        const button = wrapper.find('#submit-booking');
        button.simulate('click');
        expect(wrapper.instance().props.bookRoom).toHaveBeenCalledTimes(1);
    });

    it('should handle change accommodation', ()=>{
        const wrapper = render();
        const state = {trips: [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-01', returnDate: '2020-01-03'}]};
        const BookCard = wrapper.find('BookCard').props().handleChange({target: {name:'accommodation', value: 'SHERATON', attributes: {unique: {value: 0}}}});
        wrapper.setState({...state});
        expect(wrapper.instance().state.selectedAcommodation).toEqual('SHERATON');
    });

    it('should handle change room', ()=>{
        const wrapper = render();
        const state = {activeLocation: 1, possibleAccommodations: [{locationId: 1, name: 'SHERATON', id: 1}], trips: [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-01', returnDate: '2020-01-03'}]};
        const allRooms = {data: [{id: 1, name: 'MASSAIMARA', accommodationId: 1 }]};
        wrapper.setProps({allRooms});
        wrapper.setState({...state});
        const BookCard = wrapper.find('BookCard').props().handleChange({target: {name:'room', value: 'MASSAIMARA', attributes: {unique: {value: 0}}}});
        expect(wrapper.instance().state.trips[0].room).toBe(1);
    });

    it('should handle rooms with "Select Room"', ()=>{
        const wrapper = render();
        const state = {activeLocation: 1, possibleAccommodations: [{locationId: 1, name: 'SHERATON', id: 1}], trips: [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-01', returnDate: '2020-01-03'}]};
        const allRooms = {data: [{id: 1, name: 'MASSAIMARA', accommodationId: 1 }]};
        wrapper.setProps({allRooms});
        wrapper.setState({...state});
        const BookCard = wrapper.find('BookCard').props().handleChange({target: {name:'room', value: 'Select Room', attributes: {unique: {value: 0}}}});
        expect(wrapper.instance().state.trips[0].room).toBe('1');
    });

    it('should handle inputting dates', ()=>{
        const wrapper = render();
        const state = {activeLocation: 1, possibleAccommodations: [{locationId: 1, name: 'SHERATON', id: 1}], trips: [{location: {id:1},  checkIn: '2019-05-03', checkOut: '2020-01-01', accommodation: 'SHERATON', room: '1', travelDate: '2019-05-01', returnDate: '2020-01-03'}]};
        wrapper.setState({...state});
        const BookCard = wrapper.find('BookCard').props().handleChange({target: {name:'checkIn', value: '2019-05-12', attributes: {unique: {value: 0}}}});
        expect(wrapper.instance().state.trips[0].checkIn).toEqual('2019-05-12');
    });
});

describe('integration tests', () => {
    const render = (params, fn=shallow) => {
        const defaultProps = {
            history: {push: jest.fn()},
            request: {data: [request]},
            classes: '',
            getAccommodations: jest.fn(),
            Allaccommodations: {accommodations: [{name: 'SHERATON', status: 'Available', id: 1, locationId: 1}]},
            user: {},
            getRooms: jest.fn(),
            allRooms: {data: [{status: 'Available', name: 'MASSAIMARA', id: 1, accommodationId: 1}]},
            toggleBooking: {},
            bookRoom: {},
            bookedroom: jest.fn(),

        };
        const props = {...defaultProps, ...params };
        const store = mockedStore({
            activeLocation: undefined,
            profile: {data: {role: 'Manager'}},
            error: {
                details: '',
                class: 'hidden'
            }
        });
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<BookRoom store={store} {...props }/>);
    };

    it('should render the page successfully', () => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
    });
});