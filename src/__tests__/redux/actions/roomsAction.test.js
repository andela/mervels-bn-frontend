import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import roomsActions from '../../../redux/actions/roomsActions';
import { GET_ROOMS_SUCCESS, GET_ROOMS_ERROR } from '../../../redux/actions/actionTypes';

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
    it('should get rooms successfully', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    message: 'rooms fetched succesfully',
                    data: {}
                }
            });
        });

        await store.dispatch(roomsActions());
        await flushPromises();
        const calledActions = await store.getActions();
        expect(calledActions[0].type).toEqual(GET_ROOMS_SUCCESS); 
        done();   
    });
    it('handle failure in getting rooms but with response', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 404,
                    message: 'request not found',
                    data: {message: 'dummy message'}
                }
            });
        });

        await store.dispatch(roomsActions());
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_ROOMS_ERROR); 
        done();   
    }); 

    it('handle connection error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                error: {
                    message: 'connection error',
                    data: {message: 'dummy message'}
                }
            });
        });
        await store.dispatch(roomsActions(1));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_ROOMS_ERROR); 
        done();  
    }); 
});