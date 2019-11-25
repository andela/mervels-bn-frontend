/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import Menu from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";
import useStyles from "./iconStyles";
import Notifications from "../Notifications";
import NotificationPane from "../NotificationPane";
import ProfileMenu from "../ProfileMenu";
import logo from "../../logo/logo-long.png";
import { getProfile } from "../../redux/actions/profileAction";

export const Navbar = ({ history }) => {
  const classes = useStyles();
  const [showPane, setShowPane] = useState("notification hide");
  const [showProfilePane, setShowProfilePane] = useState("profile-menu-pane hideProfileMenu");
  const profilePicture = useSelector(state => state.profile).data.image;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const togglePane = event => {
    if (showPane === "notification hide") {
      setShowPane("notification show");
      setShowProfilePane("profile-menu-pane hideProfileMenu");
    } else {
      setShowPane("notification hide");
    }
  };

  const toggleMenuPane = event => {
    if (showProfilePane === "profile-menu-pane hideProfileMenu") {
      setShowProfilePane("profile-menu-pane showProfileMenu");
      setShowPane("notification hide");
    } else {
      setShowProfilePane("profile-menu-pane hideProfileMenu");
    }
  };

  window.onclick = event => {
    const paneClass = event.target.className;
    if (paneClass === "notification show") {
      setShowPane("notification hide");
    }
    if (paneClass === "profile-menu-pane showProfileMenu") {
      setShowProfilePane("profile-menu-pane hideProfileMenu");
    }
  };

  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="/home">
          <img alt="BareFoot Nomad" src={logo} />
        </a>
        <ul>
          <li className="root menu-icon">
            <Menu classes={classes} handlePane="" />
          </li>
          <li className="root">
            <Notifications classes={classes} handlePane={togglePane} />
          </li>
          <li className="root">
            <ChatIcon className={classes.iconHover} />
          </li>
          <li className="root profile-menu" onClick={toggleMenuPane}>
            <img src={profilePicture} className="m-right-1 profile-picture" alt="Profile" height="23" width="23"  onClick={toggleMenuPane} />
            <i className={`caret fas ${
              showProfilePane === "profile-menu-pane hideProfileMenu" ?
              'fa-caret-down' :
              'fa-caret-up'
            }`}  onClick={toggleMenuPane}/>
          </li>
        </ul>
      </nav>
      <NotificationPane
        classes={showPane}
        handlePane={togglePane}
        history={history}
      />
      <ProfileMenu
        classes={showProfilePane}
        handlePane={toggleMenuPane}
        history={history}
      />
    </>
  );
};

export default withRouter(Navbar);
