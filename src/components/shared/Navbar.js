/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */

/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import Menu from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";
import useStyles from "./iconStyles";
import Notifications from "../notifications/Notifications";
import NotificationPane from "../notifications/NotificationPane";
import ProfileMenu from "../ProfileMenu";
import MenuPane from "./Menu";
import logo from "../../logo/logo-long.png";
import ManageChatPane from "../chat/ManageChatPane";
import { getProfile } from "../../redux/actions/profileAction";
import menuCreator from "../../helpers/menuCreator";

export const Navbar = ({ history, location, role, id }) => {
  const classes = useStyles();
  const [showPane, setShowPane] = useState("hide");
  const [showChat, setShowChat] = useState('hide');
  const [showProfilePane, setShowProfilePane] = useState("hide");
  const [showMenuPane, setShowMenuPane] = useState("hide");
  const profilePicture = useSelector(state => state.profile).data.image;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const togglePane = () =>{
    if(showPane === 'hide'){
        setShowChat('hide');
        setShowProfilePane("hide");
        setShowMenuPane("hide");
        setShowPane('notification show');
    }else {
        setShowPane('hide');
    }
  };

  const toggleChat = () =>{
    if(showChat === 'hide'){
        setShowPane('hide');
        setShowProfilePane("hide");
        setShowMenuPane("hide");
        setShowChat('show');
    }else {
        setShowChat('hide');
    }
  };

  const toggleMenuPane = () => {
    if (showProfilePane === "hide") {
      setShowChat('hide');
      setShowMenuPane("hide");
      setShowPane("hide");
      setShowProfilePane("profile-menu-pane showProfileMenu");
    } else {
      setShowProfilePane("hide");
    }
  };

  const toggleMenu = () => {
    if (showMenuPane === "hide") {
      setShowChat('hide');
      setShowPane("hide");
      setShowProfilePane("hide");
      setShowMenuPane("menu-pane showMenu");
    } else {
      setShowMenuPane("hide");
    }
  };

  window.onclick = event => {
    const paneClass = event.target.className;
    if (paneClass === "notification show") {
      setShowPane("hide");
    }
    if (paneClass === "profile-menu-pane showProfileMenu") {
      setShowProfilePane("hide");
    }
    if (paneClass === "menu-pane showMenu") {
      setShowMenuPane("hide");
    }
  };

  const { menu, menuMobile } = menuCreator(location, Link, role);

  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="/dashboard">
          <img alt="BareFoot Nomad" src={logo} />
        </a>
        <ul className="menu-items">
          {menu}
        </ul>
        <ul>
          <li className="root menu-icon">
            { showMenuPane === "hide" ?
              <Menu classes={classes} onClick={toggleMenu} /> :
              <MenuOpen classes={classes} onClick={toggleMenu} />
            }
          </li>
          <li className="root">
            <Notifications classes={classes} handlePane={togglePane} />
          </li>
          <li className="root">
          <ChatIcon className={classes.iconHover} onClick={toggleChat} />
          </li>
          <li className="root profile-menu" onClick={toggleMenuPane}>
            <img src={profilePicture} className="m-right-1 profile-picture" alt="Profile" height="23" width="23"  onClick={toggleMenuPane} />
            <i className={`caret fas ${
              showProfilePane === "hide" ?
              'fa-caret-down' :
              'fa-caret-up'
            }`}  onClick={toggleMenuPane}/>
          </li>
        </ul>
      </nav>
      <NotificationPane
        userId={id}
        classes={showPane}
        handlePane={togglePane}
        history={history}
      />
      <ProfileMenu
        classes={showProfilePane}
        handlePane={toggleMenuPane}
        history={history}
      />
      <ManageChatPane classes={showChat} toggleChat={toggleChat}/>
      <MenuPane
        classes={showMenuPane}
        handlePane={toggleMenu}
        history={history}
        menu={menuMobile}
      />
    </>
  );
};

export default withRouter(Navbar);
