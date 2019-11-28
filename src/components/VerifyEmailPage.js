/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import verify from '../redux/actions/verifyAction';
import {Spinner} from './shared/Spinner';

class VerifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        const { location } = this.props;
        const token = location.search.split('?token=')[1];
        
        if (token) {
            const {verify} = this.props;
            verify(token);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {verifyData} = nextProps;
        if(verifyData.data) {
            const {userToken} = verifyData.data;
            localStorage.setItem("bareFootToken", userToken);
            localStorage.setItem("logged_in", "true");
            nextProps.history.push("/dashboard");
            toast.success("Email verified successfully");
        } else {
            const {error} = verifyData;
            if(error.status === 401) {
                toast.error("Verification Link is expired");
                nextProps.history.push('/reverify');
            } else if (error.status === 500) {
                // internal server error
                toast.error("Server Error. Try again");
                nextProps.history.push('/500');
            } else if (error.status === 501) {
                toast.error("Connection Error Try Refreshing your browser");
                // connection error try again
            } else {
                // toast email already verified login 409 handled
                toast.info("Email Already verified. Login");
                nextProps.history.push('/login');
            }
        }
    }

    render() { 
        const {verifyData} = this.props;
        const {data, error } = verifyData;
        return (!data && !error) ? <Spinner className="spinner-center" /> : (<div>
            <img alt="barefootNomad Logo" className="barefoot-logo" src="https://res.cloudinary.com/bahati/image/upload/v1573114920/marvel_logo_fngq4h.png"/>
        </div>);
    }
}
 
VerifyPage.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
    verifyData: PropTypes.object.isRequired,
};
const mapStateToProps = ({verifyData}) => {
    return {
        verifyData
    };
};
const mapDispatchToProps = {
    verify
};
export{VerifyPage};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
// export default VerifyPage;