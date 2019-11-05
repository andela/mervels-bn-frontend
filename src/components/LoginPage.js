/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

function LoginPage(props) {
  const handleClick = () => {
    localStorage.setItem("logged_in", true);
    props.history.push("/");
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
  history: PropTypes.object.isRequired
};

export default LoginPage;
