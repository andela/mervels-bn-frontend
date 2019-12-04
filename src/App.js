/* eslint-disable import/no-named-as-default */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "./redux/store";
import "./styles/App.scss";
import Login from "./components/LoginPage";
import LoggedInDashboard from "./components/LoggedInDashboard";
import PrivateRoute from "./PrivateRoute";
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import PageNotFound from "./components/PageNotFound";
import SignupPage from "./components/signupPage";
import CallForVerify from "./components/CallForVerify";
import VerifyEmailPage from "./components/VerifyEmailPage";
import ReverifyPage from "./components/ReverifyPage";
import ProfilePage from "./components/ProfilePage";
import ServerErrorPage from "./components/500Page";
import requestsPage from "./components/requestsPage";
import ApprovalsPage from "./components/approvalsPage";
import singleReqeuest from "./components/ViewRequest";
import Navbar from "./components/shared/navbarComponent";
import AccessForbiddenPage from "./components/AccessForbiddenPage";
import ManageDashboard from "./components/ManageDashboard";
import ApproveReject from "./components/ApproveReject";
import UserRoles from "./components/UserRolesPage";
import AllAccommodations from './components/accommodations';
import Accommodation from './components/oneAccommodation';
import { Authorization } from './components/shared/Authorization';

const store = configureStore();

const User = Authorization(['Requester', 'Travel Administrator', 'Manager', 'Super Administrator']);
const Manager = Authorization(['Manager', 'Super Administrator']);
const Admin = Authorization(['Super Administrator']);
const All = Authorization(['Accommodation Supplier', 'Requester', 'Travel Administrator', 'Manager', 'Super Administrator']);

const App = () => {

  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
      <Router>
        {localStorage.getItem('bareFootToken') && <Navbar />}
        <Switch>
          <Route  path="/login" component={Login} />
          <PrivateRoute exact path="/" component={LoggedInDashboard} />
          <Route path="/forgotPassword" component={ResetPasswordPage} />
          <PrivateRoute  path="/dashboard" component={User(ManageDashboard)} />
          <Route path="/signUp" component={SignupPage} />
          <Route path="/call4verify" component={CallForVerify} />
          <Route path="/404" component={PageNotFound} />
          <Route path="/verify" component={VerifyEmailPage} />
          <Route path="/reverify" component={ReverifyPage} />
          <PrivateRoute path="/accommodations" component={All(AllAccommodations)} />
          <PrivateRoute path="/accommodation/:id" component={All(Accommodation)} />
          <PrivateRoute  path="/profile" component={All(ProfilePage)} />
          <PrivateRoute  path="/500" component={ServerErrorPage} />
          <PrivateRoute  path="/requests" component={User(requestsPage)} />
          <PrivateRoute  path="/request/:id" component={User(singleReqeuest)} />
          <PrivateRoute path="/approvals/:id" component={Manager(ApproveReject)} />
            <PrivateRoute  path="/approvals" component={Manager(ApprovalsPage)} />
            <PrivateRoute path="/settings" component={Admin(UserRoles)} />
            <PrivateRoute  path="/AccessForbidden" component={AccessForbiddenPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
