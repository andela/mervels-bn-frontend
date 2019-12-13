/* eslint-disable react/forbid-prop-types */
import React from 'react';
import google from '../../logo/iconfinder_Google_1298745.png';
import fb from '../../logo/iconfinder_square-facebook_317727.png';
import { baseURL } from '../../config';

const socialAuth = () => {
  const baseUrl = baseURL;
  return (
      <>
        <div className="socialbtn">
          <a
            className="btnn btn-google btn-fb social-btn"
            href={`${baseUrl}api/v1/auth/google`}
            ><span><img src={google} alt="logo" /></span>
            <span className="m-1 google">Continue with Google </span>
          </a>
        </div>
        <div className="socialbtn">
          <a
            className="btnn btn-fb social-btn"
            href={`${baseUrl}api/v1/auth/facebook`}
            ><span><img src={fb} alt="logo" /></span>
            <span className="m-1 fb">Continue with Facebook</span>
          </a>
        </div>
      </>
  );
};

export default socialAuth;