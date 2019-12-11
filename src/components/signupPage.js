/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import signup from '../redux/actions/signupActions';
import Input from './shared/input';
import validator from '../helpers/validator';
import SocialAuth from './shared/socialAuth';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                firstName: undefined,
                lastName: undefined,
                userEmail: undefined,
                userPassword: undefined,
                confirm: undefined,
                match: undefined
            }
        };
    }

    componentDidMount() {
        this.checkLoggedIn();
      }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.user.data !==null) {
            nextProps.history.push("/call4verify");
        } else {
            const {error} =  nextProps.user;
            toast.error(error.message);

        const button = await document.querySelector('button');
        button.innerHTML = "Sign Up";
        }
    }

    handleChange = async ({target}) => {
        this.setState((prev) => ({...prev, [target.name]: target.value}));
        let { error } = await validator(target.name, target.value);
        if(target.name==='confirm'){
            if(this.state.userPassword !== this.state.confirm){
                error = 'Passwords do not match';
            }
        }
        this.setState((prev) => ({...prev, errors: { ...prev.errors, [target.name]: error } }));
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const hasErrors = Object.values(this.state.errors).some(val=> val!==undefined);
        if (!hasErrors) {
            const signUp = this.props.signup;
            const userCredentials = this.state;
            signUp(userCredentials);
            const button = await document.querySelector('.signup-btn');
            button.innerHTML = "Wait ...";
        }
    }

    checkLoggedIn = () => {
        const token = localStorage.getItem("bareFootToken");
        if (token !== null) {
          window.location.href = '/';
        }
      };

    render() {
        const {firstName, lastName, userEmail, userPassword, confirm, errors} = this.state;
        return (
            <div className="signup-page m-top-10 ">
                <div className="grid">
                    <div className="col-2" />
                    <div className="col-4">
                        <img alt="barefootNomad Logo" className="col-12 barefoot-logo" src="https://res.cloudinary.com/bahati/image/upload/v1573114920/marvel_logo_fngq4h.png"/>
                        <form className="signup-form " onSubmit = {this.handleSubmit}>
                            <Input placeholder="First Name" error={errors.firstName} required={{required: 'required'}} onChange={this.handleChange} name="firstName" classes="input full-width" inputType="text" value={firstName}/>
                            <Input placeholder="Last Name" error={errors.lastName} required={{required: 'required'}} onChange={this.handleChange} name="lastName" classes="input full-width" inputType="text" value={lastName}/>
                            <Input placeholder="Email" error={errors.userEmail} required={{required: 'required'}} onChange={this.handleChange} name= "userEmail" classes="input full-width" inputType="email" value={userEmail}/>
                            <Input placeholder="Password" error={errors.userPassword} required={{required: 'required'}} onChange={this.handleChange} name="userPassword" classes="input full-width" inputType="password" value={userPassword}/>
                            <Input placeholder="Confirm Password" error={errors.confirm} required={{required: 'required'}} onChange={this.handleChange} name="confirm" classes="input full-width" inputType="password" value={confirm}/>
                            <button type="submit" className="btn btn-primary signup-btn">Sign Up</button>
                        </form>
                    </div>
                    <div className="col-1 center-small">
                        <h1 className="center-small">OR</h1>
                    </div>
                    <div className="col-3 sm-1">
                        <SocialAuth/>
                        <div className="foot-message">Already have a Barefoot Nomad account? <a href="/login"><span className="other-link">Login</span></a></div>
                    </div>
                    <div className="col-2" />
                </div>


            </div> );
    }
};

SignUpPage.propTypes = {
    signup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object,
    push: PropTypes.func
};

const mapStateToProps = ({user}) => {
    return {
        user
    };
};

const mapDispatchToProps = {
    signup
};

export { SignUpPage };
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);