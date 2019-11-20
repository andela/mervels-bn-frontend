import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import Navbar from "../../../components/shared/navbarComponent";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Navbar Component", () => {
  it("Tests Mounting the Navbar", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toHaveLength(1);
  });
});

describe("Navbar with redux store", () => {
  const store = mockStore({
    profile: { data: { status: "", userId: "" } },
    notification: { unread: 0, notifications: [] }
  });

  it("Tests Mounting Navbar with redux", done => {
    const mocktogglePane = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Navbar
          togglePane={mocktogglePane}
          />
        </Router>
      </Provider>
    );

    // console.log(wrapper.find('#noti-icon').debug());
    wrapper.find('#noti-icon').at(0).simulate('click');
    done();
  });
  it("Tests Mounting Navbar with redux", done => {
    const mocktogglePane = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Navbar
          togglePane={mocktogglePane}
          />
        </Router>
      </Provider>
    );

    // console.log(wrapper.find('#noti-icon').debug());
    wrapper.find('#noti-icon').at(0).simulate('click');

    wrapper.find('#noti-icon').at(0).simulate('click');
    done();
  });
  it("Tests Mounting Navbar with redux", done => {
    const mocktogglePane = jest.fn();
    window.onclick = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Navbar
          togglePane={mocktogglePane}
          />
        </Router>
      </Provider>
    );

    // console.log(wrapper.find('#noti-icon').debug());
    wrapper.find('#noti-icon').at(0).simulate('click');

    wrapper.find('#noti-icon').at(0).simulate('click');
    done();
  });
});
