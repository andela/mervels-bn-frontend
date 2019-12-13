/* eslint-disable no-debugger */
import { LOAD_MOST_TRAVELLED, GET_TRIPS_BY_PERIOD } from "../actions/actionTypes";
import initialState from "./initialState";


export default  (state = initialState.dashboard, action) => {
    const { type, payload } = action;
    if(type === LOAD_MOST_TRAVELLED){
        return { ...state,  mostTravelled: {count:payload.count,destinations: payload.data } };
    }if(type === GET_TRIPS_BY_PERIOD){
        return { ...state, tripStats: {trips: payload.trips, total: payload.total} };
    }
    return state;
};