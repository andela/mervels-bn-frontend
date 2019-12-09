/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import propTypes from 'prop-types';
import moment from 'moment';
import io from 'socket.io-client';
import {
  getNotifications,
  updateNotification,
  markReadAll,
  markOneAsRead
} from "../../redux/actions/notificationActions";
import placeholder from "../../assets/pic.png";

const { baseUrl } = process.env;

const socket = io.connect(baseUrl);

export function NotificationPane({
  userId,
  notifications,
  getNotifications,
  updateNotification,
  markReadAll,
  markOneAsRead,
  handlePane,
  classes,
  history
}) {
  useEffect(() => {
    getNotifications();

    socket.on("created", (data)=> {
      if (data.userId === userId) {
        updateNotification(data);
      }
    });
  }, [getNotifications, userId, updateNotification]);

  const handleReadAll = () => {
    markReadAll();
  };

  const handleReadOne = ({ target }) => {
    const {read, id, request, type, notification} = target.dataset;
    // eslint-disable-next-line no-unused-expressions
    (read === 'false') ? markOneAsRead(id): '';
    handlePane();
    if( type === 'comment' && notification.search('The manager') === -1 ){
      history.push(`/approvals/${request}`);
    } else {
      history.push(`/request/${request}`);
    }
  };

  return (
    <div id="notifications-container" className={classes}>
      <div id="myModal" className="modal">
        <div className="modal-content effect1">
          <div className="modal-body">
            {notifications &&
              notifications.map(notification => (
                <div
                  className={`item ${!notification.read && "unread"}`}
                  key={notification.id}
                >
                  <span className="image">
                    <img src={placeholder} alt="placeholder" />
                  </span>
                  <div role="presentation" id={`not${notification.id}`} onClick={handleReadOne} className="content">
                    <span
                      className="details"
                      data-id = {`${notification.id}`}
                      data-read={`${notification.read}`}
                      data-request={`${notification.requestId}`}
                      data-notification={`${notification.notification}`}
                      data-type={`${notification.type}`}
                    >
                      {notification.notification}
                    </span>
                    <span
                      className="date"
                      data-id={`${notification.id}`}
                      data-read={`${notification.read}`}
                      data-request={`${notification.requestId}`}
                    >
                      {moment(notification.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              ))}
            {notifications.length === 0 && (
              <div className="item">
                <span className="content">
                  <p>No New Notifications</p>
                </span>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="notification-btn" type="button" id="read-all" onClick={handleReadAll}>
              <span>Mark all as read</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ notification, profile }) => {
  return {
    unread: notification.unread,
    notifications: notification.notifications,
    userId: profile.data.userId
  };
};

NotificationPane.propTypes ={
  getNotifications: propTypes.func.isRequired,
  updateNotification: propTypes.func.isRequired,
  markReadAll: propTypes.func.isRequired,
  markOneAsRead: propTypes.func.isRequired,
  handlePane: propTypes.func.isRequired,
  notifications: propTypes.object.isRequired,
  classes: propTypes.string.isRequired,
  userId: propTypes.number.isRequired,
  history: propTypes.objectOf({
      push: propTypes.func.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  { getNotifications, updateNotification, markReadAll, markOneAsRead }
)(NotificationPane);
