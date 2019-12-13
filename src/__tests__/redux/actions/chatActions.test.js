import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import { getChats, sendMessage, updateChatMessages } from "../../../redux/actions/chatActions";
import { GET_CHATS, SEND_MESSAGE, GET_NEW_MESSAGES, SERVER_ERROR} from "../../../redux/actions/actionTypes";
import { chats } from '../../../__mocks__/chats';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('Chat Actions', () => {
    let store;
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('Tests getChat action', async(done)=>{
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        name: "James Doe",
                        message: [
                            {
                                "id": 1,
                                "userId": 3,
                                "userName": "James Doe",
                                "message": "hey ",
                                "deleted": false,
                                "createdAt": "2019-11-27T13:48:06.457Z",
                                "updatedAt": "2019-11-27T13:48:06.457Z"
                            }
                        ]
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(getChats());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(GET_CHATS);
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
        await store.dispatch(getChats());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });

    it('Tests updateChatMessage action', async(done)=>{

        await store.dispatch(updateChatMessages(chats.messages[0]));
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(GET_NEW_MESSAGES);
        done();
    });

    it('Tests sendOneMessage action', async(done)=>{
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        data: chats.messages[2],
                    }
                }
            });
            await flushAllPromises();
        });

        await store.dispatch(sendMessage());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SEND_MESSAGE);
        done();
    });

    it('Tests sendOneMessage action returns error', async(done)=>{
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
        await store.dispatch(sendMessage());
        const calledActions = store.getActions();

        expect(calledActions[0].type).toEqual(SERVER_ERROR);
        done();
    });
});