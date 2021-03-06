import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import getRequestAction from '../../../redux/actions/requestAction';
import {GET_REQUEST_SUCCESS, GET_REQUEST_ERROR} from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('get request action', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should successfully get a request', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    status: 200,
                    data: {}
                }
            }); 
        });
        const requestId = 2;

        await store.dispatch(getRequestAction(requestId));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_REQUEST_SUCCESS);
        done();    
    });
    
    it('should handle errors in getting a request', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    status: 404,
                    data: {}
                }
            }); 
        });
        const requestId = 2;

        await store.dispatch(getRequestAction(requestId));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_REQUEST_ERROR); 
        done();   
    });

    it('should handle connection errors', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 501,
                error: {
                    status: 501,
                    data: {}
                }
            }); 
        });
        const requestId = 2;

        await store.dispatch(getRequestAction(requestId));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_REQUEST_ERROR); 
        done();   
    });
});   