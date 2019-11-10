/* eslint-disable react/forbid-prop-types */
import React from 'react';

const socialAuth = () => {
  const baseUrl = 'https://mervels-bn-backend-staging.herokuapp.com';
  return (
      <>
        <div>
          <a
            className="btn btn-fb social-btn"
            href={`${baseUrl}/api/v1/auth/google`}
            ><i className="fab fa-google" />
            <span className="m-1">Continue with Google</span>
          </a>
        </div>
        <div>
          <a
            className="btn btn-primary social-btn"
            href={`${baseUrl}/api/v1/auth/facebook`}
            ><i className="fab fa-facebook" />
            <span className="m-1">Continue with Facebook</span>
          </a>
        </div>
      </>
  );
};

export default socialAuth;