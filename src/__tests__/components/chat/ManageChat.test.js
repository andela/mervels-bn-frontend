/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import ManageChat, {
  ManageChatPage
} from "../../../components/chat/ManageChatPane";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe("Test ManageChat ", () => {
  describe("Unit Tests", () => {
    beforeEach(() => {
      const scrollIntoViewMock = jest.fn();
      const scrollToBottom = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      window.HTMLElement.prototype.scrollToBottom = scrollToBottom;
    });

    const render = (params, fn = mount) => {
      const defaultProps = {
        chats: {
          name: "",
          messages: [],
          users: []
        },

        updateChatMessages: jest.fn(),
        updateOnlineUsers: jest.fn(),
        getChats: jest.fn()
      };
      const props = { ...defaultProps, ...params };
      // eslint-disable-next-line import/no-named-as-default-member
      return fn(<ManageChatPage {...props} />);
    };

    it("Render page with mount", done => {
      const wrapper = render();
      expect(wrapper).toHaveLength(1);
      done();
    });
  });

  describe("Integration Tests", () => {
    beforeEach(() => {
      const scrollIntoViewMock = jest.fn();
      const scrollToBottom = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      window.HTMLElement.prototype.scrollToBottom = scrollToBottom;
    });

    const store = mockStore({
      chats: {
        name: "",
        messages: [],
        users: []
      }
    });

    const render = (params, fn = mount) => {
      const defaultProps = {
        updateChatMessages: jest.fn(),
        updateOnlineUsers: jest.fn(),
        getChats: jest.fn()
      };
      const props = { ...defaultProps, ...params };
      // eslint-disable-next-line import/no-named-as-default-member
      return fn(<ManageChat store={store} {...props} />);
    };

    it("Render page with mount", done => {
      const wrapper = render();
      expect(wrapper).toHaveLength(1);
      done();
    });
    it("Simualate chat typing", done => {
      const wrapper = render();
      const ChatEvent = {
        target: { name: "messageText", value: "pass1@word" }
      };
      wrapper.find("#messageText").simulate("change", ChatEvent);

      expect(wrapper).toHaveLength(1);
      done();
    });

    it("Simualate Clicking Send", done => {
      const wrapper = render();
      const ChatEvent = {
        target: { name: "messageText", value: "pass1@word" }
      };
      wrapper.find("#messageText").simulate("change", ChatEvent);

      wrapper.find("#sendMessage").simulate("submit");

      expect(wrapper).toHaveLength(1);
      done();
    });

  });

});
