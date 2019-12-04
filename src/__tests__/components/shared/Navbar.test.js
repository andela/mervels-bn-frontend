/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { mount } from "enzyme";
import { Navbar } from "../../../components/shared/Navbar";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let wrapper;

describe("Navbar Component", () => {
  beforeEach(() => {
    const scrollIntoViewMock = jest.fn();
    const scrollToBottom = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    window.HTMLElement.prototype.scrollToBottom = scrollToBottom;

    wrapper = mount(
      <Provider store={mockStore({
        profile: {
          data: {
            image: ''
          }
        },
        notification: {
          unread: '',
          notifications: []
        },
        chats: {
          name: "",
          messages: [],
          users: []
        }
      })}>
        <Navbar/>
      </Provider>
    );
  });

  it("Tests Mounting the Navbar", () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should open notifications pane', done => {
    const obj = wrapper.find('NotificationPane').props();
    obj.handlePane();
    expect(obj.classes).toEqual('notification hide');
    done();
  });

  it('should open profile menu pane', done => {
    const obj = wrapper.find('ProfileMenu').props();
    obj.handlePane();
    expect(obj.classes).toEqual('profile-menu-pane hideProfileMenu');
    done();
  });

  it('should close panes', done => {
    window.onclick({ target: { className: 'notification show' } });
    window.onclick({ target: { className: 'profile-menu-pane showProfileMenu' } });
    done();
  });
});

