import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import { getLocations, requestTrip, getSingleRequest, updateRequest, deleteRequest } from '../../../redux/actions/requestActions';
import {
    FETCH_LOCATIONS,
    FETCH_LOCATIONS_ERROR,
    REQUEST_TRIP_SUCCESS,
    REQUEST_TRIP_ERROR,
    FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_ERROR,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR
} from '../../../redux/actions/actionTypes';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));
 
let store;

const response = {
    data: {
        status: 200,
        message: '',
        error: '',
        data: {
            id: ''
        }
    }
};

describe('Profile Actions', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should fetch locations', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(getLocations());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_LOCATIONS);
        done();
    });

    it('should fail to fetch locations', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(getLocations());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_LOCATIONS_ERROR);
        done();
    });

    it('should fail to fetch locations', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500,
            });
            await flushAllPromises();
        });
        await store.dispatch(getLocations());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_LOCATIONS_ERROR);
        done();
    });

    it('should request a trip', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(requestTrip({ type: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(REQUEST_TRIP_SUCCESS);
        done();
    });

    it('should request a trip with toggle autofill', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(requestTrip({ type: '', toggleAutofill: true }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(REQUEST_TRIP_SUCCESS);
        done();
    });

    it('should fail to request a trip', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(requestTrip({ type: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(REQUEST_TRIP_ERROR);
        done();
    });

    it('should fail to request a trip', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(requestTrip({ type: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(REQUEST_TRIP_ERROR);
        done();
    });

    it('should fetch a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(getSingleRequest());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_REQUEST_SUCCESS);
        done();
    });

    it('should fail to fetch a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(getSingleRequest());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_REQUEST_ERROR);
        done();
    });

    it('should fail to fetch a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(getSingleRequest());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(FETCH_REQUEST_ERROR);
        done();
    });

    it('should update a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(updateRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_REQUEST_SUCCESS);
        done();
    });

    it('should fail to update a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(updateRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_REQUEST_ERROR);
        done();
    });

    it('should fail to update a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(updateRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_REQUEST_ERROR);
        done();
    });

    it('should delete a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(deleteRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(DELETE_REQUEST_SUCCESS);
        done();
    });

    it('should fail to delete a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response
            });
            await flushAllPromises();
        });
        await store.dispatch(deleteRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(DELETE_REQUEST_ERROR);
        done();
    });

    it('should fail to delete a trip request', async(done) => {
        moxios.wait(async() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(deleteRequest({ id: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(DELETE_REQUEST_ERROR);
        done();
    });
});