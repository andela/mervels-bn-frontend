import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import approveRejectAction from '../../../redux/actions/approveRejectAction';
import {APPROVE_REJECT_SUCCESS, APPROVE_REJECT_ERROR} from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
const reason = 'this is the generated comment that is more that thirty characters.';
const mockRequest = {action: 'approve', requestId: 1, reason};

describe('Signup action', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should successfully approve', async (done) => {
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

        await store.dispatch(approveRejectAction(mockRequest));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_SUCCESS); 
        done();   
    });

    it('should handle 401 from the server', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: {
                    status: 401,
                }
            }); 
        });

        await store.dispatch(approveRejectAction(mockRequest)); 
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR);  
        done();  
    });

    it('should handle non existing requests', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    status: 404,
                }
            }); 
        });

        await store.dispatch(approveRejectAction(mockRequest));
        await flushPromises();
        const calledActions = store.getActions(); 
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR); 
        done();   
    });

    it('should handle a conflict error from server', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 409,
                }
            }); 
        });

        await store.dispatch(approveRejectAction(mockRequest));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR);  
        done();  
    });

    it('should handle authorization error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 403,
                response: {
                    status: 403, 
                }
            }); 
        });

        await store.dispatch(approveRejectAction(mockRequest));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR); 
        done();   
    });
    
    it('should handle server error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {
                    status: 500, 
                }
            }); 
        });

        await store.dispatch(approveRejectAction(mockRequest));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR); 
        done();   
    });
});      