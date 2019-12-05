import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import cancelBooking from '../../../redux/actions/cancelBookingAction';
import { CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_ERROR } from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('cancel booking action tests', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => { 
        moxios.uninstall(axiosInstance);
    });
    it('should cancel successfully', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    message: 'you have cancelled succesfully',
                    data: {}
                }
            });
        });

        await store.dispatch(cancelBooking(1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(CANCEL_BOOKING_SUCCESS); 
        done();   
    });
    it('handle failure in cancelling booking but with response', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 404,
                    message: 'request not found',
                    data: {}
                }
            });
        });

        await store.dispatch(cancelBooking(1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(CANCEL_BOOKING_ERROR); 
        done();   
    }); 

    it('handle connection error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                response: {
                    message: 'connection error',
                    data: {}
                }
            });
        });
        await store.dispatch(cancelBooking(1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(CANCEL_BOOKING_ERROR); 
        done();  
    }); 

    it('handle errors without status codes', async (done) => {
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
        await store.dispatch(cancelBooking(1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(CANCEL_BOOKING_ERROR); 
        done();    
    }); 
});