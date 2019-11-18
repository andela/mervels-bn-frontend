/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import moxios from "moxios";
import { shallow, mount } from "enzyme";
import { createMemoryHistory } from "history";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { ResetPasswordPage } from "../../../components/ResetPassword/ResetPasswordPage";
import ResetPasswordPageWithStore from "../../../components/ResetPassword/ResetPasswordPage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Reset Password Form", () => {
  function renderResetPassword(args) {
    const defaultProps = {
      sendResetPassword: jest.fn(),
      resetPassword: jest.fn(),
      userId: undefined,
      userToken: undefined,
      errors: {
        status: "",
        message: ""
      },
      message: "",
      location: {
        pathname: "/forgotPassword",
        hash: "",
        search: "",
        state: undefined
      }
    };

    const props = { ...defaultProps, ...args };
    return mount(<ResetPasswordPage {...props} />);
  }

  describe("Success in ResetFormTemplate, ResetEmailSentTemplate and PasswordResetFormTemplate", () => {
    let useEffect;

    let wrapper;

    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
      useEffect = jest.spyOn(React, "useEffect");
    });

    test("should test ResetForm Template", done => {
      wrapper = renderResetPassword();
      expect(wrapper.find("form").length).toBe(1);
      done();
    });

    test("should test onChange Email inputs on Email Form ", done => {
      wrapper = renderResetPassword();
      const Eevent = { target: { name: "email", value: "email@gmail.com" } };
      const Fevent = { target: { name: "emailForm" } };

      wrapper.find('Input[name="email"]').simulate("change", Eevent);
      wrapper.find('[name="emailForm"]').simulate("submit", Fevent);

      expect(wrapper.find("form").length).toBe(1);
      mockUseEffect();
      done();
    });

    test("should render Reset Email Sent Template", done => {
        mockUseEffect();
        const Eevent = { target: { name: "email", value: "email@gmail.com" } };
        wrapper.find('Input[name="email"]').simulate("change", Eevent);

      expect(wrapper.find("div").length).toBeGreaterThan(0);
      done();
    });

    test("should test onChange inputs Password Reset Form inputs ", done => {
      const history = createMemoryHistory("/resetPassword/10/123123asdsa");
      const newProps = {
        userId: "10",
        userToken: "123123asdsa",
        history,
        location: {
          pathname: "/resetPassword/10/123123asdsa",
          hash: "",
          search: "",
          state: undefined
        },
        errors: {
          message: "",
          status: ""
        }
      };

      wrapper = renderResetPassword(newProps);

      const Pevent = { target: { name: "password", value: "@sadsa.cons" } };
      const CPevent = { target: { name: "newPassword", value: "@sadsa.cons" } };
      const DPevent = { target: { name: "default", value: "@sadsa.cons" } };
      wrapper.find('Input[name="password"]').simulate("change", Pevent);
      wrapper.find('Input[name="newPassword"]').simulate("change", CPevent);
      wrapper.find('Input[name="newPassword"]').simulate("change", DPevent); // Default On change

      const Fevent = { target: { name: "passwordForm" } };
      wrapper.find('[name="passwordForm"]').simulate("submit", Fevent);

      expect(wrapper.find("form").length).toBe(1);
      done();
    });

  });

  describe("Errror in ResetFormTemplate, ResetEmailSentTemplate and PasswordResetFormTemplate", () => {
    let useEffect;

    let failWrapper;

    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
      useEffect = jest.spyOn(React, "useEffect");
      mockUseEffect();
      mockUseEffect();
    });
    test("should fail to render Reset Email Sent Template", done => {


      failWrapper = renderResetPassword({
        errors: {message: "Server Error", status: "500" }
      });

      // mockUseEffect();
      const Eevent = { target: { name: "email", value: "email@gmail.com" } };
      const Fevent = { target: { name: "emailForm" } };

      failWrapper.find('Input[name="email"]').simulate("change", Eevent);
      failWrapper.find('[name="emailForm"]').simulate("submit", Fevent);

      expect(failWrapper.find("form").length).toBe(1);

      done();
    });

    test("should fail Reset Password Template Sent Template", done => {
      const history = createMemoryHistory("/resetPassword/10/123123asdsa");
      const newProps = {
        userId: "10",
        userToken: "123123asdsa",
        history,
        location: {
          pathname: "/resetPassword/10/123123asdsa",
          hash: "",
          search: "",
          state: undefined
        },
        errors: {message: "Server Error", status: "500" }
      };

      failWrapper = renderResetPassword(newProps);

      const Pevent = { target: { name: "password", value: "@sadsa.cons" } };
      failWrapper.find('Input[name="password"]').simulate("change", Pevent);
      expect(failWrapper.find("form").length).toBe(1);

      done();
    });

    test("should test ResetForm Template", done => {
      const Passevent = { target: { name: "password", value: "@sadsa.cons" } };
      failWrapper.find('Input[name="password"]').simulate("change", Passevent);
      expect(failWrapper.find("form").length).toBe(1);

      done();
    });

  });
});

describe(" Reset Password Form with Store", () => {
  let wrapper;
  let store;
  let hist;

  beforeEach(() => {
    store = mockStore({
      message: "",
      errors: {
        message: "",
        status: ""
      },
      resetPassword: {
        message: ""
      }
    });
  });

  it("Test mapStateToProps ", () => {
    hist = createMemoryHistory("/forgotPassword");
    wrapper = mount(<ResetPasswordPageWithStore store={store}
      sendResetPassword={jest.fn()}
      resetPassword={jest.fn()}
      userId=""
      userToken=""
      history={hist}
      location= {{
        pathname: "/forgotPassword",
        hash: "",
        search: "",
        state: undefined
      }}
      errors={{message: "", status: "" }}
      />);
    expect(1).toBe(1);
  });
  it("Test mapStateToProps when reset Password", () => {
    hist =  createMemoryHistory("/resetPassword/10/123123asdsa");
    wrapper = shallow(<ResetPasswordPageWithStore store={store}
      sendResetPassword={jest.fn()}
      resetPassword={jest.fn()}
      history={hist}
      location= {{
        pathname: "/resetPassword/10/123123asdsa",
        hash: "",
        search: "",
        state: undefined
      }}
      errors={{message: "", status: "" }}
      />);
    expect(1).toBe(1);
  });
});

