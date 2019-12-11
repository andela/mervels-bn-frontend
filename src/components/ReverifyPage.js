/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import reverify from '../redux/actions/reverifyActions';
import Input from './shared/input';

class ReverifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: ''
        };
    }

    async componentWillMount() {
        const token = localStorage.getItem('bareFootToken');
        if(token) {
            this.props.history.push('/dashboard');
        }
    }

    async componentWillReceiveProps(nextProps) {
        const {reverifyData} = nextProps;
        if (reverifyData.data !==null) {
            nextProps.history.push("/call4verify");
        }
        else {
            const {error} = reverifyData;
            if(error.status === 404){
                // email not found
                toast.error("Email not registered");
            } else if(error.status === 501){
                // connection error
                toast.error("Connection error. Try again");
            } else {
                // sever error
                toast.error("Server error. Try again later");
            }
            const button = await document.querySelector('button');
            button.innerHTML = "Send";

        }
    }

    handleChange = async ({target}) => {
        this.setState((prev) => ({...prev, [target.name]: target.value}));
    }

    handleSubmit = async (event) => {
        event.preventDefault();
            const {reverify} = this.props;
            reverify(this.state);
            const button = await document.querySelector('button');
            button.innerHTML = "Sending ...";
    }

    render() {
        const {userEmail} = this.state;
        return (
        <div className="reverify-page">
            <div className="frm-cover">
        <img alt="barefootNomad Logo" className="barefoot-logo" src="https://res.cloudinary.com/bahati/image/upload/v1573114920/marvel_logo_fngq4h.png"/>
        <form className="reverify-form m-top-10" onSubmit = {this.handleSubmit}>
            <p style={{fontSize: "16px"}}>Your verification link has expired. Enter your email to receive a new one</p>
        <Input placeholder="Email" required={{required: 'required'}} onChange={this.handleChange} name="userEmail" classes="frm-input input full-width" inputType="email" value={userEmail}/>
        <button type="submit" className="btn btn-primary reverify-btn">Send</button>
        </form>
        </div>
    </div>);
    }
};

ReverifyPage.propTypes = {
    reverify: PropTypes.func.isRequired,
    history: PropTypes.object,
    push: PropTypes.func,
    reverifyData: PropTypes.object.isRequired,
};

const mapStateToProps = ({reverifyData}) => {
    return {
        reverifyData,
    };
};

const mapDispatchToProps = {
    reverify
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverifyPage);
export {ReverifyPage};