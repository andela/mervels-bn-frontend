import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import reverifyAction from '../../../redux/actions/reverifyActions';
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

    it('should successfully reverify', async (done) => {
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
        const userEmail = "email@barefoot.com";

        await store.dispatch(reverifyAction(userEmail));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.REVERIFY_SUCCESS);   
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
        const userEmail = "email@barefoot.com";

        await store.dispatch(reverifyAction(userEmail));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.REVERIFY_ERROR);
        done();    
    });

    it('should handle unregistered emails', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    status: 404,
                }
            }); 
        });
        const userEmail = "email@barefoot.com";

        await store.dispatch(reverifyAction(userEmail));
        await flushPromises();
        const calledActions = store.getActions(); 
        expect(calledActions[0].type).toEqual(actionTypes.REVERIFY_ERROR); 
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
        const userEmail = "email@barefoot.com";

        await store.dispatch(reverifyAction(userEmail));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.REVERIFY_ERROR); 
        done();   
    });
    
});   