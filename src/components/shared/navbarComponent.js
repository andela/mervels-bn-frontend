/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import useStyles from "./iconStyles";
import Notifications from "../Notifications";
import NotificationPane from "../NotificationPane";
import logo from "../../logo/logo-long.png";


const Navbar = ({history}) => {
  const classes = useStyles();
  const [showPane, setShowPane] = useState('notification hide');

  const togglePane = (event) =>{
    if(showPane === 'notification hide'){
        setShowPane('notification show');
    }else {
        setShowPane('notification hide');
    }
  };

  window.onclick = (event) =>{
    const paneClass = event.target.className;
    if(paneClass === 'notification show'){
        setShowPane('notification hide');
    }
  };



  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="/home"><img alt="BareFoot Nomad" src={logo} /></a>
        <ul>
          <li className={classes.root}>
            <Notifications classes={classes} handlePane={togglePane} />
          </li>
          <li className={classes.root}>
            <ChatIcon className={classes.iconHover} />
          </li>
          <li className={classes.root}>
            <AccountCircleIcon className={classes.iconHover} />
          </li>
        </ul>
      </nav>
      <NotificationPane classes={showPane} handlePane={togglePane} history={history} />
    </>
  );
};
export default withRouter(Navbar);
