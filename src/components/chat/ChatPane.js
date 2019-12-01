/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React from "react";
import moment from 'moment';
import closeIcon from "../../assets/icons8-close-window-100.png";


class ChatPane extends React.Component {

  messagesEndRef = React.createRef()

  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView();
  }


  render() {
    const { classes, toggleChat, chats, handleInput, handleSubmit, message } = this.props;
    return (
      <div id="chat-container" className={classes}>
        <div id="chat-title">
          <span>BareFoot Nomad Chat Room</span>
          <img
            src={closeIcon}
            alt="Close Chat"
            onClick={toggleChat}
            onKeyPress={toggleChat}
          />
        </div>
        <div id="chat-message-list">
          {chats &&
            chats.messages.map(chat => (
              <div key={chat.id}
                className={`message-row ${chat.userName === chats.name ? "you-message": "other-message"}`}>
                <div className="message-content">
                  <div className="message-sender">{chat.userName !== chats.name && chat.userName}</div>
                  <div className="message-text">
                    {chat.message}
                  </div>
                  <div className="message-time">{moment(chat.createdAt).fromNow()}</div>
                </div>
              </div>
            ))}
           <div ref={this.messagesEndRef} />
        </div>
        <form id="chat-form" onSubmit={handleSubmit}>
            <input type="text"
              name="messageText"
              id="messageText"
              className="chat-form-input"
              placeholder="Type a message"
              onChange={handleInput}
              value={message} required/>
            <button id="sendMessage" className="chat-form-button"
            type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

export default ChatPane;

