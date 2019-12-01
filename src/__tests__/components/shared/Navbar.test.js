/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from "react";
import { Router } from 'react-router-dom';
import thunk from "redux-thunk";
// import { createMemoryHistory } from "history";
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

