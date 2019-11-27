/* eslint-disable no-debugger */
import { LOAD_MOST_TRAVELLED, GET_TRIPS_BY_PERIOD } from "./actionTypes";
import api, { config } from '../../config/axiosInstance';
import { handleError } from "./errorActions";

export const getMostTravelledSuccess = (payload) =>{

    return{
        type: LOAD_MOST_TRAVELLED, payload
    };
};

export const getTripsByPeriod = (payload) =>{

    return {
        type: GET_TRIPS_BY_PERIOD, payload
    };
};
export const getMostTravelled = () => async (dispatch) =>{
    try{
        const response = await api.get(`api/v1/accommodations/most-travelled-destination`, config);

        dispatch(getMostTravelledSuccess(response.data.data));
    }catch(error){
        dispatch(handleError(error));
    }
};

export const getTrips = (period) => async(dispatch) =>{
    try{

        const response = await api.post(`api/v1/requests/trip-stats`, period, config);

        dispatch(getTripsByPeriod(response.data.data));
    }catch(error){
        dispatch(handleError(error));
    }
};