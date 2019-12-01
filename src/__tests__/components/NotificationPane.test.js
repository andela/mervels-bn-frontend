/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {shallow , mount} from '../../config/enzyme.config';
import NotificationPane ,{NotificationPane as NotificationPaneNoStore} from '../../components/notifications/NotificationPane';
import { notificationsList } from "../../__mock_data__/notifications";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Notification Pane with no store', ()=>{
    it('Should display notification pane successfully with no notifications', done =>{
        const wrapper = shallow(<NotificationPaneNoStore notifications={[]} getNotifications={jest.fn()} />);
        expect(wrapper).toHaveLength(1);
        done();
    });
    it('Should display notification pane successfully with some notifications ', done=>{

        const wrapper = shallow(<NotificationPaneNoStore
             notifications={notificationsList}
              getNotifications={jest.fn()}
              updateNotification={jest.fn()}
              />);
        expect(wrapper).toHaveLength(1);
        done();
    });
    it('Should display notification pane successfully with some notifications ', done=>{

        const wrapper = shallow(<NotificationPaneNoStore
             notifications={notificationsList}
              getNotifications={jest.fn()}
              updateNotification={jest.fn()}
              />);
        expect(wrapper).toHaveLength(1);
        done();
    });
    it('Should mark all notifications as mark-read all', (done)=>{

        const mockHandleReadAll = jest.fn();

        const wrapper = shallow(<NotificationPaneNoStore
             notifications={notificationsList}
              getNotifications={jest.fn()}
              updateNotification={jest.fn()}
              handleReadAll={jest.fn()}
              markReadAll={mockHandleReadAll}
              />);
        wrapper.find("#read-all").simulate("click");

        expect(mockHandleReadAll.mock.calls.length).toBe(1);

        done();
    });
    it('Should mark one notifications as read', (done)=>{
        const history = createMemoryHistory('/');
        const mockHandleReadOne = jest.fn();
        // eslint-disable-next-line no-unused-vars
        const wrapper = mount(
        <Router>
            <NotificationPaneNoStore
             notifications={notificationsList}
              getNotifications={jest.fn()}
              updateNotification={jest.fn()}
              handlePane={jest.fn()}
              markOneAsRead={jest.fn()}
              handleReadOne={mockHandleReadOne}
              history={history}

              />);
        </Router>);

        wrapper.find("#not59").simulate("click");

        expect(mockHandleReadOne.mock.calls.length).toBe(0);

        done();
    });

});

describe('Test Notification Pane with redux store', ()=>{
    const store = mockStore({
        notification: {unread: 2, notifications: notificationsList},
        profile: {data: {status: 'Fetch success', userId: 2}},
    });

    it('Should display notification pane successfully with no notifications', done=>{
        const wrapper = mount(
            <Provider store={store}>
                <NotificationPane getNotifications={jest.fn()} />
            </Provider>
        );
        expect(wrapper).toHaveLength(1);

        done();
    });

});
