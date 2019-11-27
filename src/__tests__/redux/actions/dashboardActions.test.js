import moxios from "moxios";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axiosInstance from "../../../config/axiosInstance";
import { getMostTravelled, getTrips } from "../../../redux/actions/dashboardAction";
import { LOAD_MOST_TRAVELLED,SERVER_ERROR, GET_TRIPS_BY_PERIOD } from "../../../redux/actions/actionTypes";

const mockedStore = configureStore([thunk]);
const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe("Dashboard Actions", () => {
  let store;
  beforeEach(() => {
    store = mockedStore();
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it("Tests getMostTravelled destination action", async done => {
    moxios.wait(async () => {
      const requestOne = moxios.requests.at(0);
      requestOne.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              count: 1,
              data: []
            }
          }
        }
      });
      await flushAllPromises();
    });
    await store.dispatch(getMostTravelled());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(LOAD_MOST_TRAVELLED);
    done();
  });
  it("Tests getMostTravelled destination with error action", async done => {
    moxios.wait(async () => {
      const requestOne = moxios.requests.at(0);
      requestOne.respondWith({
        status: 500,
        response: {
          error: {}
        }
      });
      await flushAllPromises();
    });
    await store.dispatch(getMostTravelled());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(SERVER_ERROR);
    done();
  });

  it("Tests getTripsByPeriod destination action", async done => {
    moxios.wait(async () => {
      const requestOne = moxios.requests.at(0);
      requestOne.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              total: 1,
              trips: [10]
            }
          }
        }
      });
      await flushAllPromises();
    });
    await store.dispatch(getTrips());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(GET_TRIPS_BY_PERIOD);
    done();
  });
  it("Tests getTripsByPeriod error", async done => {
    moxios.wait(async () => {
        const requestOne = moxios.requests.at(0);
        requestOne.respondWith({
          status: 500,
          response: {
            error: {}
          }
        });
        await flushAllPromises();
    });
    await store.dispatch(getTrips());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(SERVER_ERROR);
    done();
  });
});
