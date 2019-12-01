import chatReducer from "../../../redux/reducers/chatReducer";
import {
  GET_CHATS,
  SEND_MESSAGE,
  GET_NEW_MESSAGES
} from "../../../redux/actions/actionTypes";
import { chats } from "../../../__mocks__/chats";


const initialState = {
    name: '',
    messages: [],
    users: []
};

describe("Chat Reducer ", () => {
  it("Tests getChats action to store", done => {
    const data = {
        data: { name: chats.name, messages: chats.messages }
    };
    const newState = chatReducer(initialState, {
      type: GET_CHATS,
      ...data
    });
    expect(newState.name).toBe(chats.name);
    done();
  });
  it("Tests send New Message action to store", done => {
    const data = {
      data: chats.messages[0]
    };
    const newState = chatReducer(initialState, {
      type: SEND_MESSAGE,
      data
    });
    expect(newState.messages.length).toBe(1);
    done();
  });
  it("Tests Get New Message action to store", done => {
    const data = {
        data: chats.messages[0]
      };
    const newState = chatReducer(initialState, {
      type: GET_NEW_MESSAGES,
      data
    });
    expect(newState.messages.length).toBe(1);
    done();
  });
});
