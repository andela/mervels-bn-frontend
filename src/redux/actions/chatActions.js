/* eslint-disable no-debugger */
import api, { config } from "../../config/axiosInstance";
import { GET_CHATS, SEND_MESSAGE, GET_NEW_MESSAGES } from "./actionTypes";
import { handleError } from "./errorActions";

export const loadChatSuccess = response => {
  return {
    type: GET_CHATS,
    data: response.data
  };
};

export const sendMessageSuccess = response =>{
    return {
        type: SEND_MESSAGE,
        data: response.data
    };
};


export const updateChatMessageSuccess = response =>{

    return {
        type: GET_NEW_MESSAGES,
        data: response.data
    };
};

export const sendMessage = message => async dispatch => {
  try {
    const response = await api.post(`api/v1/chat`, message, config);
    dispatch(sendMessageSuccess(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getChats = () => async dispatch => {
  try {
    const response = await api.get(`api/v1/chat`, config);
    dispatch(loadChatSuccess(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};


export const updateChatMessages = (data) => async dispatch => {
  dispatch(updateChatMessageSuccess({data}));
};


