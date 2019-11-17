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
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
// eslint-disable-next-line import/no-named-as-default
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import NotificationPane from './components/NotificationPane';
import PageNotFound from "./components/PageNotFound";
import SignupPage from "./components/signupPage";
import CallForVerify from "./components/CallForVerify";
import VerifyEmailPage from "./components/VerifyEmailPage";
import ReverifyPage from "./components/ReverifyPage";
import ProfilePage from "./components/ProfilePage";
import ServerErrorPage from "./components/500Page";
import requestsPage from "./components/requestsPage";

const store = configureStore();

const App = () => {

  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={HomePage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <Route
              path="/resetPassword/:userId/:userToken"
              component={ResetPasswordPage}
            />
            <Route path="/forgotPassword" component={ResetPasswordPage} />
            <PrivateRoute  path="/notifications" component={NotificationPane} />
            <Route path="/signUp" component={SignupPage} />
            <Route path="/call4verify" component={CallForVerify} />
            <Route path="/verify" component={VerifyEmailPage} />
            <Route path="/reverify" component={ReverifyPage} />
            <Route path="/404" component={PageNotFound} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/requests" component={requestsPage} />
            <PrivateRoute path="/500" component={ServerErrorPage} />
            <PrivateRoute exact path="/" component={LoggedInDashboard} />
            <Redirect to="/404" />
          </Switch>
          <ToastContainer autoClose={3000} hideProgressBar />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
