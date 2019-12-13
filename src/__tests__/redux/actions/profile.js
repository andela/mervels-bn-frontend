import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axiosInstance from '../../../config/axiosInstance';
import { getProfile, updateProfile, updateProfilePicture } from '../../../redux/actions/profileAction';
import { GET_PROFILE, GET_PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from '../../../redux/actions/actionTypes';

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

let store;
describe('Profile Actions', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('should fetch user profile', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key: 'value'
                        }
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key2: 'value'
                        }
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(getProfile());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_PROFILE);
        done();
    });

    it('should fetch user profile', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: null
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: null
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(getProfile());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_PROFILE);
        done();
    });

    it('should fetch user profile', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key2: 'null'
                        }
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key2: 'null'
                        }
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(getProfile());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_PROFILE);
        done();
    });

    it('should fail to fetch user', async(done) => {
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
        await store.dispatch(getProfile());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_PROFILE_ERROR);
        done();
    });

    it('should fail to fetch user', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(getProfile());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_PROFILE_ERROR);
        done();
    });

    it('should update user info', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key: 'value'
                        }
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key: 'value'
                        }
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfile({}));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE);
        done();
    });

    it('should update user info', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key: 'null'
                        }
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: {
                            key: 'null'
                        }
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfile({}));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE);
        done();
    });

    it('should update user info', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: null
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        userProfile: null
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfile({}));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE);
        done();
    });

    it('should fail to update user info', async(done) => {
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
        await store.dispatch(updateProfile({ key: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE_ERROR);
        done();
    });

    it('should fail to update user info', async(done) => {
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
        await store.dispatch(updateProfile({ key: 'value' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE_ERROR);
        done();
    });

    it('should fail to update user info', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfile({ key: 'value' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE_ERROR);
        done();
    });

    it('should update user picture', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        data: {}
                    }
                }
            });
            await flushAllPromises();
            const requestTwo = moxios.requests.at(1);
            requestTwo.respondWith({
                status: 200,
                response: {
                    data: {
                        status: 200,
                        message: '',
                        data: {}
                    }
                }
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfilePicture({}));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE);
        done();
    });

    it('should fail to update user picture', async(done) => {
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
        await store.dispatch(updateProfilePicture({ key: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE_ERROR);
        done();
    });

    it('should fail to update user picture', async(done) => {
        moxios.wait(async() => {
            const requestOne = moxios.requests.at(0);
            requestOne.reject({
                status: 500
            });
            await flushAllPromises();
        });
        await store.dispatch(updateProfilePicture({ key: '' }));
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(UPDATE_PROFILE_ERROR);
        done();
    });
});