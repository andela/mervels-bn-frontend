/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  getChats,
  sendMessage,
  updateChatMessages,
  updateOnlineUsers
} from "../../redux/actions/chatActions";
import ChatPane from "./ChatPane";

const { baseUrl } = process.env;
const socket = io.connect(baseUrl);

export const ManageChatPage = ({ chats, getChats, updateChatMessages,updateOnlineUsers, ...props }) => {
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    getChats();
    socket.on("chat-message", data => {
      if (chats.name !== "" && data.userName !== chats.name) {
        updateChatMessages(data);
      }
    });
  }, [getChats, updateChatMessages, updateOnlineUsers, chats.name]);

  const handleInput = async e => {
    setMessageText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { sendMessage } = props;
    if (messageText !== "") {
      sendMessage({ message: messageText });
      setMessageText("");
    }
  };

  return (
    <ChatPane
      {...props}
      chats={chats}
      onlineUsers={[]}
      message={messageText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = ({ chats }) => {
  return {
    chats
  };
};

export default connect(
  mapStateToProps,
  { getChats, sendMessage, updateChatMessages, updateOnlineUsers }
)(ManageChatPage);
