/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  sendResetPassword,
  resetPassword
} from "../../redux/actions/resetPassword";
import "../../styles/resetPassword.scss";
import logo from '../../logo/logo@2x.png';


import {
  ResetFormTemplate,
  ResetEmailSentTemplate,
  PasswordResetFormTemplate
} from "./ResetPasswordForm";

export function ResetPasswordPage({
  sendResetPassword,
  resetPassword,
  userId,
  userToken,
  errors,
  message,
  history
}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [emailSent, setEmailSent] = useState(false);

  React.useEffect(() => {
    redirect();
  }, [errors]);

  const handleChange = event => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "newPassword":
        setNewPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formName = event.target.name;
    formName === "emailForm"
      ? sendResetPassword({ email })
      : resetPassword({ password, newPassword, userId, userToken });
  };

  function redirect() {
    if(userId === undefined){
      if (errors.message === "" && email !== undefined) {
        setEmailSent(true);
        toast.success("Reset Password Link sent");
      } else if (errors.message !== "" && email !== undefined) {
        toast.error(errors.message);
      }
    }else if(password !== undefined && errors.message !== "" ){
        toast.error(errors.message);
      }else if(password !== undefined && errors.message === "") {
        toast.success("Password Reset Successfully");
        history.push('/');
      }

  }

  return (
    <div className="login-container">
      <div className="local">
      <img src={logo} alt="logo" />
      {userId === undefined ? (
        !emailSent ? (
          <ResetFormTemplate
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ResetEmailSentTemplate email={email} />
        )
      ) : (
        <PasswordResetFormTemplate
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      </div>
    </div>
  );
}

function mapStateToProps({ resetPassword, errors }, ownProps) {
  const  userId  = (ownProps.match) ? ownProps.match.params.userId : "";
  const  userToken  = (ownProps.match) ? ownProps.match.params.userToken : "";
  return {
    userId,
    userToken,
    errors,
    message: resetPassword.message
  };
}

export default connect(
  mapStateToProps,
  { sendResetPassword, resetPassword }
)(ResetPasswordPage);

