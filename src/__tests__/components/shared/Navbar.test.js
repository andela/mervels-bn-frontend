/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import Navbar from "../../../components/shared/navbarComponent";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Navbar Component", () => {
  it("Tests Mounting the Navbar", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toHaveLength(1);
  });
});

