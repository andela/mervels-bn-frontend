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
  commentReducer
});
