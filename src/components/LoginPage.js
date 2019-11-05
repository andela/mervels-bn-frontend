/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

function LoginPage({history, location}) {

  useEffect(()=>{
    // Redirect to home if logged in already
    if(localStorage.getItem("logged_in")){
      history.push('/');
    }
  },[history]);

  const handleClick = () => {
    localStorage.setItem("logged_in", true);
    if(!location.state){
      history.push("/");
    }else{
      // Redirect to page that was trying to login
      const redirectTo = location.state.redirectTo.path;
      history.push(redirectTo);
    }
  };

  return (
      <div>
      <h6>Click Button to Login</h6>
      <button type="button" onClick={handleClick} className="btn-sample">
        Press To Login
      </button>
    </div>
  );

}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default LoginPage;
