/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifications, updateNotification } from "../redux/actions/notificationActions";
import { socket } from "../config/sockets";
import placeholder  from '../assets/pic.png';
import '../styles/notification.scss';



function NotificationPage({unread, notifications, getNotifications, updateNotification}) {

    useEffect(()=>{
        getNotifications();

        socket.on('created', function(data) {
            updateNotification(data);
         });
    },[getNotifications, updateNotification]);

    return(
        <div>
            <button type='button'>Show Notifications</button>
            <div className="notification">
                <span>Unread : {unread}</span>
            <div className="body effect1">
                {notifications && notifications.map(notification => (
                        <div className="item" key={notification.id}>
                            <span className="image">
                                <img src={placeholder} alt='placeholder' />
                            </span>
                        <span className="content">
                            <span className="details">
                                {notification.notification}
                            </span>
                            <span className="date">
                                12/12/2019
                            </span>
                        </span>
                 </div>

                ))}
            </div>
        </div>
        </div>
    );
                // }
}

const mapStateToProps = ({notification}) =>{
    return {
        unread: notification.unread,
        notifications: notification.notifications
    };
};


export default connect(mapStateToProps, { getNotifications, updateNotification })(NotificationPage);