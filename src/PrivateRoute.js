/* eslint-disable no-debugger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Redirect, Route  } from "react-router-dom";
import PropTypes from 'prop-types';


function PrivateRoute({component:Component , ...rest}){
    useEffect(()=>{
        debugger;
    });
    return (
        <Route {...rest} render={props=>(
            localStorage.getItem('logged_in') === 'true' ?
            (<Component {...props} />) :
            (<Redirect to="/login" />)
        )} />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
  };


export default PrivateRoute;