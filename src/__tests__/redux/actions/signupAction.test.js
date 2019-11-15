import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import signupAction from '../../../redux/actions/signupActions';
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
    it('should successfully signup', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                    status: 201,
                    message: 'any message',
                    data: {}
                }
            });
        });
        const createdUser = {
            userEmail: "barefoot@barefoot.com",
            userPassword: "Root1123#",
            firstName: "Bahati",
            lastName: "Robben"
        };

        await store.dispatch(signupAction(createdUser));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.SIGN_UP); 
        done();   
    });

    it('should handle duplicate signup', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    status: 409,
                    message: 'any message',
                    data: {}
                }
            });
        });
        const createdUser = {
            userEmail: "barefoot@barefoot.com",
            userPassword: "Root1123#",
            firstName: "Bahati",
            lastName: "Robben"
        };

        await store.dispatch(signupAction(createdUser));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.SIGN_UP_ERROR); 
        done();    
    });

    it('should handle valication errors from server', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 422,
                response: {
                    status: 422,
                    message: 'any message',
                    data: {}
                } 
            });
        });
        const createdUser = {
            userEmail: "barefoot@barefoot.com",
            userPassword: "Root1123#",
            firstName: "Bahati",
            lastName: "Robben"
        };

        await store.dispatch(signupAction(createdUser));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.SIGN_UP_ERROR); 
        done();    
    });

    it('should handle server errors', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {
                    status: 500,
                    message: 'any message',
                    data: {}
                }
            });
        });
        const createdUser = {
            userEmail: "barefoot@barefoot.com",
            userPassword: "Root1123#",
            firstName: "Bahati",
            lastName: "Robben"
        };

        await store.dispatch(signupAction(createdUser));
        await flushPromises();
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(actionTypes.SIGN_UP_ERROR); 
        done();    
    }); 
});   