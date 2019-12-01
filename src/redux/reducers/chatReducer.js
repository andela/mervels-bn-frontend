/* eslint-disable no-debugger */
import { GET_CHATS, SEND_MESSAGE, GET_NEW_MESSAGES } from '../actions/actionTypes';

const initialState = {
    name: '',
    messages: [],
    users: []
};

export default (chat = initialState, action) => {
    const { type , data} = action;
    if(type === GET_CHATS){
        return {...chat, name: data.name, messages: data.message};
    }
    if(type === SEND_MESSAGE || type === GET_NEW_MESSAGES){
        const newMessages = [].concat(chat.messages);
        newMessages.push(data);
        return {...chat, messages: newMessages};
    }

    return chat;
};