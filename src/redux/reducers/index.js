import { combineReducers } from "redux";
import loginReducer from "./login";
import errorReducer from "./errorReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import user from "./signupReducer";
import reverifyData from "./reverifyReducer";
import verifyData from "./verifyReducer";
import profileReducer from './profileReducer';
import requestsReducers from './requestsReducers';

export default combineReducers({
  loginReducer,
  errors: errorReducer,
  resetPassword: resetPasswordReducer,
  user,
  reverifyData,
  verifyData,
  profile: profileReducer,
  requests: requestsReducers
});
