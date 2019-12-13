import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from 'axios';
import addSupplierAction from '../../../redux/actions/addSupplierAction';
import {ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_ERROR} from '../../../redux/actions/actionTypes';

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
const reason = 'this is the generated comment that is more that thirty characters.';
const mockRequest = {action: 'approve', requestId: 1, reason};

describe('supplier action', () => {
    beforeEach(() => {
        store = mockedStore({
        });
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should successfully add supplier', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                    status: 201,
                    message: 'supplier created successfully',
                    data: {}
                }
            }); 
        });

        await store.dispatch(addSupplierAction(mockRequest));
        await flushPromises(); 
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(ADD_SUPPLIER_SUCCESS); 
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
            await flushPromises(); 
        });

        await store.dispatch(addSupplierAction(mockRequest)); 
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(ADD_SUPPLIER_ERROR);  
        done();  
    });

    it('should handle errors without status codes from the server', async (done) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                response: {
                    message: 'error without status code.',
                }
            }); 
            await flushPromises(); 
        });

        await store.dispatch(addSupplierAction(mockRequest));  
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(ADD_SUPPLIER_ERROR);  
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

        await store.dispatch(addSupplierAction(mockRequest));
        const calledActions = store.getActions(); 
        expect(calledActions[0].type).toEqual(ADD_SUPPLIER_ERROR); 
        done();   
    });

});      