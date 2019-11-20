/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-mutable-exports */
import socketIOClient from "socket.io-client";
import {
  updateNotification,
  updateNotificationSuccess
} from "../redux/actions/notificationActions";

// const { baseUrl } = process.env;
// const  baseUrl  = 'http://localhost:4000';

export let socket = null;

export function connect() {
  socket = socketIOClient.connect(baseUrl);

}

