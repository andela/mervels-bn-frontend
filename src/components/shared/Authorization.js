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
      const { authReducer, errors } = this.props;
      if(authReducer){
          this.changeState(authReducer);
      }
      if(errors) {
          this.handleError(errors);
      }
    }

    handleError = (errors) => {
        const { history } = this.props;
        if(errors.message){
            toast.error(errors.message);
        }
        if(errors.status === 401){
            localStorage.removeItem('bareFootToken');
            history.push('/login');
        }
        if(errors.status === 500){
            history.push('/500');
        }
    }

    changeState = (authReducer) => {
        if(authReducer.user) {
            this.setState({
                user: authReducer.user
            });
        }
    }

    render() {
      const { user } = this.state;
      const { authReducer, WrappedComponent, allowedRoles } = this.props;
      const { userRoles } = user;
      if(!user.userRoles) {
        return (
          <div>Loading</div>
        );
      }
      if (allowedRoles.includes(userRoles)) {
        return <WrappedComponent user={authReducer.user} {...this.props} />;
      } else if(userRoles === 'Accommodation Supplier') {
        return <Redirect to='/accommodations' />;
      } else {
        return <Redirect to='/dashboard' />;
      }
    }
  };
 
  WithAuthorization.propTypes = {
    checkUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };


export const Authorization =  (allowedRoles) => (WrappedComponent) => {
  

  const mapStateToProps = ({  errors, authReducer }) => ({
    errors,
    authReducer,
    allowedRoles,
    WrappedComponent
  });

  return connect(mapStateToProps, { checkUser })(WithAuthorization);
};