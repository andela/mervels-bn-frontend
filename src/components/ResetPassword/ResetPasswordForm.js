/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from "react";
import Input from "../shared/input";
import Button from "../shared/Button";


export const ResetFormTemplate = ({ handleChange, handleSubmit, email, submitting }) => (
  <form onSubmit={handleSubmit} name="emailForm">
    <label htmlFor="email">
      <p>
        Inorder to reset password please provide an email linked to your barefoot
        nomad account below
      </p>
       <Input
          name="email"
          inputType="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
    </label>
    <Button ButtonId="reset-password" submitting={submitting} buttonType="submit"  classes="btn btn-primary" text="Reset Password" />
    {/* <button className="btn btn-primary" type="submit">Reset Password</button> */}
  </form>
);

export const ResetEmailSentTemplate = ({ email }) => (
  <div>
    <p>Kindly check your email: <strong>{email}</strong> for Password reset information</p>
  </div>
);

export const ResetEmailComplete = () => (
  <div>
    <p>Password Reset Successfully.</p>
  </div>
);

export const PasswordResetFormTemplate = ({ handleChange, handleSubmit, error }) => (
  <div>
    <form onSubmit={handleSubmit} name="passwordForm">
      <h2>Password Reset Form</h2>
      <Input
        name="password"
        inputType="password"
        placeholder="Enter Password"
        onChange={handleChange}
        autoComplete="off"
        error={error.password}
        required
      />
      <Input
        name="newPassword"
        inputType="password"
        placeholder="Confirm Password"
        autoComplete="off"
        onChange={handleChange}
        required
      />
       <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
);
