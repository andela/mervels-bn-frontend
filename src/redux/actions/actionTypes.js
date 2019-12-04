/* export constant action types */
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FETCH_REQUESTS = "FETCH_REQUESTS";
export const FETCH_REQUESTS_FAILED = "FETCH_REQUESTS_FAILED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_PAST = "FETCH_PAST";
export const FETCH_REQUEST_APPROVALS = "FETCH_REQUEST_APPROVALS";
export const FETCH_REQUEST_APPROVALS_FAILED = "FETCH_REQUEST_APPROVALS_FAILED";
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';
export const REQUEST_TRIP_SUCCESS = 'REQUEST_TRIP_SUCCESS';
export const REQUEST_TRIP_ERROR = 'REQUEST_TRIP_ERROR';
export const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
export const FETCH_REQUEST_ERROR = 'FETCH_REQUEST_ERROR';
export const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
export const UPDATE_REQUEST_ERROR = 'UPDATE_REQUEST_ERROR';
export const DELETE_REQUEST_SUCCESS = 'DELETE_REQUEST_SUCCESS';
export const DELETE_REQUEST_ERROR = 'DELETE_REQUEST_ERROR';

/** Error Types  */
export const SERVER_ERROR = 'SERVER_ERROR';
export const NETWORK_ERROR = 'NETWORK_ERROR';

/** Password Reset  */
export const RESET_PASSWORD_SENT = 'RESET_PASSWORD_SENT';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';

/** Notifications */
export const NOTIFICATION_GET =  'NOTIFICATION_GET';
export const NOTIFICATION_UPDATE =  'NOTIFICATION_UPDATE';
export const NOTIFICATION_READALL = 'NOTIFICATION_READALL';
export const NOTIFICATION_READONE = 'NOTIFICATION_READONE';

/** Dasboard */
export const LOAD_MOST_TRAVELLED = 'LOAD_MOST_TRAVELLED';
export const GET_TRIPS_BY_PERIOD = 'GET_TRIPS_BY_PERIOD';


/** approve reject request */
export const APPROVE_REJECT_ERROR = 'APPROVE_REJECT_ERROR';
export const APPROVE_REJECT_SUCCESS = 'APPROVE_REJECT_SUCCESS';
export const GET_REQUEST_SUCCESS = 'GET_REQUEST_SUCCESS';
export const GET_REQUEST_ERROR = 'GET_REQUEST_ERROR';
/* USER ROLE ACTION TYPES */
export const ASSIGN_SUCCESS = 'ASSIGN_SUCCESS';
export const ASSIGN_FAILED = 'ASSIGN_FAILED';

/** adding an accommodation supplier */
export const ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS';
export const ADD_SUPPLIER_ERROR = 'ADD_SUPPLIER_ERROR';
/* GET COMMENTS */
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_FAILED = 'GET_COMMENTS_FAILED';

/* POST COMMENTS */
export const POST_COMMENTS = 'POST_COMMENTS';
export const POST_COMMENTS_FAILED = 'POST_COMMENTS_FAILED';

/* DELETE COMMENTS */
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const DELETE_COMMENTS_FAILED = 'DELETE_COMMENTS_FAILED';

/** Accommodations  */
export const GET_ACCOMMODATIONS_SUCCESS = 'GET_ACCOMMODATIONS_SUCCESS';
export const GET_ACCOMMODATIONS_FAILURE = 'GET_ACCOMMODATIONS_FAILURE';
export const GET_ACCOMMODATION_SUCCESS = 'GET_ACCOMMODATION_SUCCESS';
export const GET_ACCOMMODATION_FAILURE = 'GET_ACCOMMODATION_FAILURE';
export const ADD_ACCOMMODATION_SUCCESS = 'ADD_ACCOMMODATION_SUCCESS';
export const ADD_ACCOMMODATION_FAILURE = 'ADD_ACCOMMODATION_FAILURE';
export const ADD_ROOMS_SUCCESS = 'ADD_ROOMS_SUCCESS';
export const ADD_ROOMS_FAILURE = 'ADD_ROOMS_FAILURE';

/** AUTHORIZATION */
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';

export default {
    SIGN_UP: 'SIGN_UP',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',
    REVERIFY_ERROR: 'REVERIFY_ERROR',
    REVERIFY_SUCCESS: 'REVERIFY_SUCCESS',
    VERIFY_SUCCESS: 'VERIFY_SUCCESS',
    VERIFY_ERROR: 'VERIFY_ERROR',

};