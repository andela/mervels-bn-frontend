import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import "./styles/index.scss";
import configureStore from './redux/store';
import LoginPage from "./components/LoginPage";
import LoggedInDashboard from "./components/LoggedInDashboard";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import SignupPage from "./components/signupPage";
import CallForVerify from "./components/CallForVerify";
import VerifyEmailPage from "./components/VerifyEmailPage";
 import ReverifyPage from "./components/ReverifyPage";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
      <Router>
        <Switch>
          <Route  path="/login" component={LoginPage} />
          <PrivateRoute  path="/home" component={HomePage} />
          <PrivateRoute exact path="/" component={LoggedInDashboard} />
          <PrivateRoute  path="/dashboard" component={DashboardPage} />
          <Route path="/signUp" component={SignupPage} />
          <Route path="/call4verify" component={CallForVerify} />
          <Route path="/verify" component={VerifyEmailPage} />
          <Route path="/reverify" component={ReverifyPage} />

        </Switch>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
