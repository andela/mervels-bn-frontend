import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axiosInstance from '../../../config/axiosInstance';
import likeAction from '../../../redux/actions/likeAction';
import { LIKE_SUCCESS, LIKE_ERROR } from '../../../redux/actions/actionTypes';

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

    it('should like', async(done) => {
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
        await store.dispatch(likeAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(LIKE_SUCCESS);
        done();
    });

    it('should fail to like', async(done) => {
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
        await store.dispatch(likeAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(LIKE_ERROR);
        done();
    });

    it('should fail to like', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500,
            });
            await flushAllPromises();
        });
        await store.dispatch(likeAction());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(LIKE_ERROR);
        done();
    });
});