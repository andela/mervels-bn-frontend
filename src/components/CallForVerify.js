/* eslint-disable react/prop-types */

/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class CallForVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    async componentWillMount() {
        const token = localStorage.getItem('bareFootToken');
        if(token) {
            this.props.history.push('/dashboard');
        }
    }

    render() { 
        return (<div className="c4v-contianer">
        <div className="c4v">
                    <img alt="barefootNomad Logo" className="barefoot-logo" src="https://res.cloudinary.com/bahati/image/upload/v1573114920/marvel_logo_fngq4h.png"/>
                    <div className="call4verif-container">
                        <h4 className="c4v-title">Please verify your email</h4>
                        <p>
                        An email has been sent to your inbox with a link to verify your account.
                If you have not received the email after a few minutes, please check your spam folder.
                </p>
                <p className="notice-exp"><i className="fa fa-exclamation-triangle"/>The verification link is valid for 24 hours.</p>
                <Link to="/login" className="verify-ok"><button className="btn btn-primary" type="button">Ok</button></Link>
                    </div>
                    </div>
                    </div>);
    }
}
 
export default CallForVerify;