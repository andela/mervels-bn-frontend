/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import { checkUser } from '../../redux/actions/authorization';
import Navbar from "./Navbar";
import { Spinner } from './Spinner';


export class WithAuthorization extends Component {
    constructor() {
        super();
        this.state = {
          user: {},
        };
    }

    componentDidMount() {
      const { checkUser } = this.props;
      checkUser();
    }

    shouldComponentUpdate(nextProps) {
        const { user } = this.state;
        if(nextProps.authReducer.user !== user){
            return true;
        }
        return false;
    }

    componentDidUpdate() {
      const { authReducer } = this.props;
      if(authReducer.user){
          this.changeState(authReducer.user);
      }
      if(authReducer.error) {
          this.handleError(authReducer.error);
      }
    }

    handleError = (errors) => {
        const { history } = this.props;
        toast.error(errors.message);
        if(errors.status === 401){
            localStorage.removeItem('bareFootToken');
            history.push('/login');
        }
        if(errors.status === 500){
            history.push('/500');
        }
    }

    changeState = (user) => {
      this.setState({
          user,
      });
    }

    render() {
      const { user } = this.state;
      const { authReducer, WrappedComponent, allowedRoles } = this.props;
      const { userRoles } = user;
      const navbar = localStorage.getItem('bareFootToken') ? <Navbar role={userRoles} id={user.id} /> : '';
      if(!user.userRoles) {
        return (
          <div>
            {navbar}
            <Spinner className='spinner-center' />
          </div>
        );
      }
      if (allowedRoles.includes(userRoles)) {
        return (
          <>
            {navbar}
            <WrappedComponent user={authReducer.user} {...this.props} />
          </>
        );
      } else if(userRoles === 'Accommodation Supplier') {
        return (
          <>
            {navbar}
            <Redirect to='/accommodations' />
          </>
        );
      } else {
        return (
          <>
            {navbar}
            <Redirect to='/dashboard' />
          </>
        );
      }
    }
  };

  WithAuthorization.propTypes = {
    checkUser: PropTypes.func.isRequired,
    authReducer: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };


export const Authorization =  (allowedRoles) => (WrappedComponent) => {


  const mapStateToProps = ({ authReducer }) => ({
    authReducer,
    allowedRoles,
    WrappedComponent
  });

  return connect(mapStateToProps, { checkUser })(WithAuthorization);
};