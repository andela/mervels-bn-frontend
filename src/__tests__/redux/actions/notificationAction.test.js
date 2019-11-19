import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import { getNotifications, updateNotification, markReadAll, markOneAsRead } from "../../../redux/actions/notificationActions";
import { NOTIFICATION_GET, NOTIFICATION_UPDATE, SERVER_ERROR, NOTIFICATION_READALL, NOTIFICATION_READONE } from "../../../redux/actions/actionTypes";
import { notificationsList } from '../../../__mock_data__/notifications';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('Notification Actions', () => {
    let store;
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('Tests getNotification action', async(done)=>{
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        unread: 10,
                        notifications: notificationsList
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(getNotifications());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(NOTIFICATION_GET);
        done();
    });

    it('Tests getNotification action returns error', async(done)=>{
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
        await store.dispatch(getNotifications());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });

    it('Tests updateNotification action', async(done)=>{

        await store.dispatch(updateNotification(notificationsList[0]));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(NOTIFICATION_UPDATE);
        done();
    });

    it('Tests markOneAsRead action', async(done)=>{
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        data: "1 read",
                        message: "notification read"
                    }
                }
            });
            await flushAllPromises();
        });

        await store.dispatch(markOneAsRead(59));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(NOTIFICATION_READONE);
        done();
    });

    it('Tests markOneAsRead action Fail', async(done)=>{
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

        await store.dispatch(markOneAsRead(59));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });


    it('Tests markReadAll  action', async(done)=>{
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(markReadAll());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(NOTIFICATION_READALL);
        done();
    });

    it('Tests markReadAll  action with server return error', async(done)=>{
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
        await store.dispatch(markReadAll());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });

});