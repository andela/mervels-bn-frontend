import dashboardReducer from "../../../redux/reducers/dashboardReducer";
import {
  LOAD_MOST_TRAVELLED,
  GET_TRIPS_BY_PERIOD
} from "../../../redux/actions/actionTypes";

const initialState = {
  dashboard: {
    mostTravelled: {
      destinations: [],
      count: 0
    },
    tripStats: {
      total: 0,
      trips: []
    }
  }
};

describe("dashboard Reducer ", () => {
  it("Tests getMostTravelled action to store", done => {
    const payload = {
         count: 1, data: [1]

    };
    const newState = dashboardReducer(initialState.dashboard, {
      type: LOAD_MOST_TRAVELLED,
      payload
    });
    expect(newState.mostTravelled.count).toBe(1);
    done();
  });

  it("Tests getTripsByPeriod action to store", done => {
    const payload = {
         total: 1, trips: [1]
    };
    const newState = dashboardReducer(initialState.dashboard, {
      type: GET_TRIPS_BY_PERIOD,
      payload
    });
    expect(newState.tripStats.total).toBe(1);
    done();
  });
});
