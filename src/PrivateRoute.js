/* eslint-disable no-debugger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route  } from "react-router-dom";
import PropTypes from 'prop-types';


function PrivateRoute({component:Component , ...rest}){
    return (
        <Route {...rest} render={props=>(
            localStorage.getItem('bareFootToken') !== null ?
            (<Component {...props} />) :
            (<Redirect to={{
                pathname:'/login',
                state:{redirectTo: {...rest}}
            }
            } />)
        )} />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
  };


export default PrivateRoute;