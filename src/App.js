import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/store';
import "./styles/App.scss";
import Login from "./components/LoginPage";
import LoggedInDashboard from "./components/LoggedInDashboard";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
      <Router>
        <Switch>
          <Route  path="/login" component={Login} />
          <Route  path="/home" component={HomePage} />
          <PrivateRoute exact path="/" component={LoggedInDashboard} />
          <PrivateRoute  path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
