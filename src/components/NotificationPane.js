/* eslint-disable func-names */
/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getNotifications,
  updateNotification
} from "../redux/actions/notificationActions";
import { socket } from "../config/sockets";
import placeholder from "../assets/pic.png";


function NotificationPane({
  userId,
  notifications,
  getNotifications,
  updateNotification,
  classes,
}) {
  useEffect(() => {
    getNotifications();

    socket.on("created", function(data) {

      if(data.userId === userId){ updateNotification(data); }

    });
  }, [getNotifications, userId, updateNotification]);

  const formatDate = date => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    const newDate = new Date(date).toLocaleTimeString("en-us", options);

    return newDate;
  };
  return (
    <div className={classes}>
      <div id="myModal" className="modal">
        <div className="modal-content effect1">
          <div className="modal-body">
            {notifications &&
              notifications.map(notification => (
                <div className="item" key={notification.id}>
                  <span className="image">
                    <img src={placeholder} alt="placeholder" />
                  </span>
                  <a href="/home" className="content">
                  {/* <span className="content"> */}
                    <span className="details">{notification.notification}</span>
                    <span className="date">
                      {formatDate(notification.createdAt)}
                    </span>
                  {/* </span> */}
                  </a>

                </div>
              ))}
          </div>
          <div className="modal-footer">
            <a href="/">
              <span>View all notifications</span>
            </a>
            <a href="/">
              <span>Mark all as read</span>
            </a>
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

export default connect(
  mapStateToProps,
  { getNotifications, updateNotification }
)(NotificationPane);
