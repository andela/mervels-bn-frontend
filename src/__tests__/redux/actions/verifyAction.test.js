import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import verifyAction from '../../../redux/actions/verifyAction';
import actionTypes from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('Signup action', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should successfully verify', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                    status: 201,
                    data: {}
                }
            }); 
        });
        const token = "generic usertoken";

        await store.dispatch(verifyAction(token));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.VERIFY_SUCCESS); 
        done();   
    });

    it('should successfully verify', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: {
                    status: 401,
                }
            }); 
        });
        const token = "generic usertoken";

        await store.dispatch(verifyAction(token));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.VERIFY_ERROR);
        done();    
    });

    it('should successfully verify', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 409,
                }
            }); 
        });
        const token = "generic usertoken";

        await store.dispatch(verifyAction(token));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.VERIFY_ERROR);
        done();    
    });

    it('should successfully verify', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {
                    status: 500,
                }
            }); 
        });
        const token = "generic usertoken";

        await store.dispatch(verifyAction(token));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.VERIFY_ERROR);
        done();    
    });
    
});   