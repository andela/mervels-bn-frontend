/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
// import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import useStyles from './iconStyles';

const Navbar = () => {
    const classes = useStyles();
        return(
            <>
                <nav className="navbar">
                    <a className="navbar-brand" href="/home">BarefootNomad</a>
                    <ul>
                        <li className={classes.root}>
                            <NotificationsIcon className={classes.iconHover} />
                        </li>
                        <li className={classes.root}>
                            <ChatIcon className={classes.iconHover} />
                        </li>
                        <li className={classes.root}>
                            <AccountCircleIcon className={classes.iconHover} />
                        </li>
                    </ul>
                </nav>
            </>
        );
        };
export default Navbar; 