/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import signup from '../redux/actions/signupActions';
import Input from './shared/Input';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleChange = ({target}) => {
        this.setState((prev) => ({...prev, [target.name]: target.value}));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const signUp = this.props.signup;
        const userCredentials = this.state;
        signUp(userCredentials);
    }

    render() { 
        const {firstName, lastName, userEmail, userPassword, confirm} = this.state;
        return ( <div className="signup-page">
            <img alt="barefootNomad Logo" src="https://res.cloudinary.com/bahati/image/upload/v1573114920/marvel_logo_fngq4h.png"/>
            <form className="user-form" onSubmit = {this.handleSubmit}>
            <div >
                <Input placeholder="First Name" onChange={this.handleChange} name="firstName" className="frm-input" type="text" value={firstName}/>
                <Input placeholder="Last Name" onChange={this.handleChange} name="lastName" className="frm-input" type="text" value={lastName}/>
            </div>
            <Input placeholder="Email" onChange={this.handleChange} name= "userEmail" className="frm-input full-width" type="email" value={userEmail}/>
            <Input placeholder="Password" onChange={this.handleChange} name="userPassword" className="frm-input full-width" type="password" value={userPassword}/>
            <Input placeholder="Confirm Password" onChange={this.handleChange} name="confirm" className="frm-input full-width" type="password" value={confirm}/>
            <button type="submit" className="btn btn-primary large">Sign Up</button>
            </form>
            <div className="center-small">OR</div>
        </div> );
    } 
};

SignUpPage.propTypes = {
    signup: PropTypes.func.isRequired,
    // user: PropTypes.object.isRequired
};
const mapStateToProps = ({user}) => {
    return {
        user
    };
};

const mapDispatchToProps = {
    signup
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);