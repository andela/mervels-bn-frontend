import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axiosInstance from '../../../config/axiosInstance';
import feedbackAction from '../../../redux/actions/feedbackAction';
import { FEEDBACK_SUCCESS, FEEDBACK_ERROR } from '../../../redux/actions/actionTypes';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

let store;

describe('Test Like Action', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should add feedback', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: 'x',
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(feedbackAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FEEDBACK_SUCCESS);
        done();
    });

    it('should fail to add feedback', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {
                    data: {
                        status: 500,
                        message: 'x',
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(feedbackAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FEEDBACK_ERROR);
        done();
    });

    it('should fail to add feedback', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500,
            });
            await flushAllPromises();
        });
        await store.dispatch(feedbackAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FEEDBACK_ERROR);
        done();
    });
});