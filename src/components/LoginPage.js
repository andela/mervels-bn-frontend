/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

function LoginPage({history, location}) {

   const [token, setToken] = useState(null);

  useEffect(()=>{
    // Redirect to home if logged in already
    if(localStorage.getItem("logged_in") !== null){
      history.push('/');
    }
  },[history]);


  const handleClick = () => {
    localStorage.setItem("logged_in", token);
    if(!location.state){
      history.push("/");
    }else{
      // Redirect to page that was trying to login
      const redirectTo = location.state.redirectTo.path;
      history.push(redirectTo);
    }
  };

  const handleChange = (event) =>{
    setToken(event.target.value);
  };

  return (
      <div>
      <h6>Click Button to Login</h6>
      <input type="text" onChange={handleChange} name="token" />
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
