import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import configureStore from './redux/store';
import "./App.scss";
import LoginPage from "./components/LoginPage";
import LoggedInDashboard from "./components/LoggedInDashboard";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./components/HomePage";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={LoggedInDashboard} />
          <Route  path="/login" component={LoginPage} />
          <PrivateRoute  path="/home" component={HomePage} />
        </Switch>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
