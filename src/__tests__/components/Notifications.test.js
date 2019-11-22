/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {shallow, mount } from '../../config/enzyme.config';
import Notifications, {Notifications as NotificationNoStore} from '../../components/Notifications';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe("Notification with no Store component/>", () => {
    const render = (params, fn=mount) => {
        const defaultProps = {
            unread: 0,
            classes: {margin: 2},
            getProfile: jest.fn(),
            getNotifications: jest.fn(),
            handlePane: jest.fn(),


        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<NotificationNoStore {...props }/>);
    };
    it('should render when user profile not loaded', () => {
        const wrapper = render({profile: {data: {status: '', userId: ''}}});
        expect(wrapper).toHaveLength(1);
    });
    it('should render with user profile loaded', done => {
        const wrapper = render({profile: {data: {status: 'User Profile Loaded', userId: 1}}});
        expect(wrapper).toHaveLength(1);
        done();
    });
});

describe("Notification with no Store component/>", () => {
    const store = mockStore({
        profile: {data: {status: '', userId: ''}},
        notification: {unread: 0, notifications: []}
      });

    const render = (params, fn=mount) => {
        const defaultProps = {
            unread: 0,
            classes: {margin: 2},
            getProfile: jest.fn(),
            getNotifications: jest.fn(),
            handlePane: jest.fn(),
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(
        <Provider store={store}>
            <Notifications {...props }/>
        </Provider>

        );
    };
    test.only('should render when user profile not loaded', done => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
        done();
    });
});