import { combineReducers } from "redux";
import loginReducer from "./login";
import errorReducer from "./errorReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import user from "./signupReducer";
import reverifyData from "./reverifyReducer";
import verifyData from "./verifyReducer";
import profileReducer from './profileReducer';
import requestsReducers from './requestsReducers';
import requestReducer from './requestReducer';
import approveReject from './approveRejectReducer';
import singleRequest from './SingleRequestReducer';
import notification from './notificationReducer';
import approvalsReducers from './requestApprovalsReducer';
import dashboardReducer from './dashboardReducer';
import superAdminReducers from './superAdminReducers';
import addedSupplier from './addSupplierReducer';
import commentReducer from './commentReducers';
import chatReducer from './chatReducer';
import accommodations from './accommodations';
import accommodation from './accommodationReducer';
import addAccommodation from './addAccommodation';
import addRooms from './addRooms';
import authReducer from './authorizationReducer';
import like from './likeReducer';
import feedback from './feedbackReducer';
import rateAccommodationReducer from './rateAccommodationReducer';
import bookedroom from './bookingReducer';
import allRooms from './roomsReducer';
import cancelBooking from './cancelBookingReducer';

export default combineReducers({
  loginReducer,
  errors: errorReducer,
  resetPassword: resetPasswordReducer,
  user,
  reverifyData,
  verifyData,
  profile: profileReducer,
  requests: requestsReducers,
  notification,
  approvals: approvalsReducers,
  request: requestReducer,
  dashboard: dashboardReducer,
  approveReject,
  singleRequest,
  superAdminReducers,
  addedSupplier,
  commentReducer,
  chats: chatReducer,
  accommodations,
  accommodation,
  addAccommodation,
  addRooms,
  authReducer,
  like,
  feedback,
  rateAccommodationReducer,
  bookedroom,
  allRooms,
  cancelBooking,
});
