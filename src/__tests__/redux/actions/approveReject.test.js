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

    it('should handle anyother status code error from the server', async (done) => {
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
    
    it('should handle connection error', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 501,
                error: {
                    status: 501, 
                }
            }); 
            await flushPromises();
        });

        await store.dispatch(approveRejectAction(mockRequest));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(APPROVE_REJECT_ERROR); 
        done();   
    });
});      