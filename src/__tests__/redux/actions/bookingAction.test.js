import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import bookingAction from '../../../redux/actions/bookingAction';
import { BOOKING_SUCCESS, BOOKING_ERROR } from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('booking action tests', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => { 
        moxios.uninstall(axiosInstance);
    });
    it('book a room', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    message: 'you have booked succesfully',
                    data: {}
                }
            });
        });
        const bookDetails = [{
            "checkIn": "2019-08-03",
            "checkOut": "2019-12-10",
            "accommodation": "MARIOT",
            "room": 4
        }];

        await store.dispatch(bookingAction(bookDetails, 1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(BOOKING_SUCCESS); 
        done();   
    });
    it('handle failure in booking room but with respnse', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 409,
                    message: 'you have already boked this room',
                    data: {}
                }
            });
        });
        const bookDetails = [{
            "checkIn": "2019-08-03",
            "checkOut": "2019-12-10",
            "accommodation": "MARIOT",
            "room": 4
        }];

        await store.dispatch(bookingAction(bookDetails, 1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(BOOKING_ERROR); 
        done();   
    }); 

    it('handle connection error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                error: {
                    status: 500,
                    message: 'server error',
                    data: {}
                }
            });
        });
        const bookDetails = [{
            "checkIn": "2019-08-03",
            "checkOut": "2019-12-10",
            "accommodation": "MARIOT",
            "room": 4
        }];

        await store.dispatch(bookingAction(bookDetails, 1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(BOOKING_ERROR); 
        done();   
    }); 

    it('handle errors without status codes', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                error: {
                    message: 'server error',
                    data: {}
                }
            });
        });
        const bookDetails = [{
            "checkIn": "2019-08-03",
            "checkOut": "2019-12-10",
            "accommodation": "MARIOT",
            "room": 4
        }];

        await store.dispatch(bookingAction(bookDetails, 1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(BOOKING_ERROR); 
        done();   
    }); 
});