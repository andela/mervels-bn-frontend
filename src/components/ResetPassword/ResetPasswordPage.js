/* eslint-disable react/require-default-props */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import {
  sendResetPassword,
  resetPassword
} from "../../redux/actions/resetPassword";
import "../../styles/resetPassword.scss";
import validator from '../../helpers/validator';
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
  history
}) {
  if(localStorage.getItem('bareFootToken')) {
    history.push('/dashboard');
  }
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setErrors] = useState({
    email: undefined,
    password: undefined,
    match: undefined
  });

  React.useEffect(() => {
    redirect();
  }, [errors]);

  const handleChange =  async({target}) => {
    const { error } = await validator(target.name, target.value);

    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
         setPassword(target.value);
        setErrors({...validationError, password: error});
        break;
      case "newPassword":
         setNewPassword(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formName = event.target.name;
    const hasErrors = Object.values(validationError).some(val=> val!==undefined);

    if(formName === 'emailForm'){
      if (email !== undefined && email.length > 5 ){
        setSubmitting(true);
        sendResetPassword({ email });
      }else {
        setSubmitting(false);
        toast.error('Email cannot be empty');
      }
    }else if(!hasErrors && password === newPassword){
        resetPassword({ password, newPassword, userId, userToken });
      }else {
        toast.error('Validation Error Passwords do not match');
      }

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
            submitting={submitting}

          />
        ) : (
          <ResetEmailSentTemplate email={email} />
        )
      ) : (
        <PasswordResetFormTemplate
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={validationError}
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
    // message: resetPassword.message
  };
}

/** PropTypes  */
ResetPasswordPage.propTypes = {
  sendResetPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userToken: PropTypes.string,
  errors: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  { sendResetPassword, resetPassword }
)(ResetPasswordPage);

