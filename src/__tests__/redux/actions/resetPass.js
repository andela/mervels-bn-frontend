/* eslint-disable no-unused-vars */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import { resetPassword, sendResetPassword } from '../../../redux/actions/resetPassword';
import { RESET_PASSWORD_SENT, PASSWORD_RESET_SUCCESS, NETWORK_ERROR, SERVER_ERROR } from '../../../redux/actions/actionTypes';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

let store;
describe('Reset Password Actions', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should send reset password', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(sendResetPassword({email: "william@gmail.com"}));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(RESET_PASSWORD_SENT);
        done();
    });
    it('should trigger error handler reset password', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 500,
                response: {
                    data: {
                        status: 500,
                        error: '',
                        data: {}
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(sendResetPassword({email: "william@gmail.com"}));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });
    it('should send new password', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                    }
                }
            });
            await flushAllPromises();
        });
        const data ={
            userId: 10,
            userToken: '123123',
            password: 'Root123ae',
            newPassword: 'Root123ae',
        };
        await store.dispatch(resetPassword(data));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(RESET_PASSWORD_SENT);
        done();
    });
    it('should trigger error handler when invalid token', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 500,
                response: {
                    data: {
                        status: 500,
                        error: '',
                        data: {}
                    }
                }
            });
            await flushAllPromises();
        });
        const data ={
            userId: 10,
            userToken: 'invalidToken',
            password: 'Root123ae',
            newPassword: 'Root123ae',
        };

        await store.dispatch(resetPassword(data));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });
});
