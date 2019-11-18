import notificationReducer from "../../../redux/reducers/notificationReducer";
import {
  NOTIFICATION_GET,
  NOTIFICATION_UPDATE,
  NOTIFICATION_READALL,
  NOTIFICATION_READONE
} from "../../../redux/actions/actionTypes";
import { notificationsList } from "../../../__mock_data__/notifications";

const initialState = {
  notifications: {
    unread: 0,
    notifications: []
  }
};

describe("Notification Reducer ", () => {
  it("Tests getNotifcation action to store", done => {
    const payload = {
      data: {
        data: { unread: 10, notifications: notificationsList }
      }
    };
    const newState = notificationReducer(initialState, {
      type: NOTIFICATION_GET,
      ...payload
    });
    expect(newState.unread).toBe(10);
    done();
  });
  it("Tests updateNotification action to store", done => {
    const payload = {
      data: notificationsList[0]
    };
    const newState = notificationReducer(initialState.notifications, {
      type: NOTIFICATION_UPDATE,
      payload
    });
    expect(newState.unread).toBe(1);
    done();
  });
  it("Tests markAllRead action to store", done => {
    const newState = notificationReducer(initialState, {
      type: NOTIFICATION_READALL
    });
    expect(newState.unread).toBe(0);
    done();
  });
  it("Tests markOneNotification action to store", done => {
    const newState = notificationReducer( {unread: 10, notifications: notificationsList}, {
      type: NOTIFICATION_READONE,
      data: 59
    });
    expect(newState.unread).toBe(9);
    done();
  });
});
