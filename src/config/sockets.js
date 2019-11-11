/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-mutable-exports */
import socketIOClient from 'socket.io-client';
import { updateNotification, updateNotificationSuccess } from "../redux/actions/notificationActions";

const { baseUrl } = process.env;

export let socket = null;

export  function connect(){
    socket = socketIOClient.connect(baseUrl);

    // socket.on('created', function(data) {
    //    dispatch(updateNotificationSuccess(data));
    //     // updateNotificationSuccess(data);
    // });
}

