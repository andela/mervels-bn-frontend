/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SocialAuth from "./shared/socialAuth";
import Input from "./shared/input";
import { localAuth, socialAuth } from "../redux/actions/login";
import logo from "../logo/logo@2x.png";

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    this.setState(prevState => ({ ...prevState }));
    this.checkLoggedIn();
    const { location, socialAuth } = this.props;
    if (location !== undefined) {
      const base64encoded = location.search.split("&")[0].split("?code=")[1];
      if (base64encoded) {
        const decoded = JSON.parse(atob(base64encoded));
        socialAuth(decoded);
      }
    }
  }

  componentDidUpdate() {
    const { user, history } = this.props;
    if (user.isLoggedIn === true) {
      const token = localStorage.getItem("bareFootToken");
      if (token) {
        history.push("/");
      }
    }
  }

  checkLoggedIn = () => {
    const { history } = this.props;
    const token = localStorage.getItem("bareFootToken");
    if (token !== null) {
      history.push("/dashboard");
    }
  };

  handleInput = async e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { localAuth } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    const user = {
      userEmail: email,
      userPassword: password
    };
    localAuth(user);
  };

  render() {
    const { password, email } = this.state;
    return (
      <div className="login-container">
        <div className="local">
          <img src={logo} alt="logo" />
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <Input
              name="email"
              inputType="email"
              placeholder="Email"
              onChange={this.handleInput}
              value={email}
              required
            />
            <Input
              name="password"
              inputType="password"
              placeholder="Password"
              onChange={this.handleInput}
              value={password}
              required
            />
            <div className="forgot">
              <a href="/forgotPassword">Forgot your password?</a>
            </div>
            <button className="btnn btnn-primary log" type="submit">
              Login
            </button>
          </form>
          <div className="social">
            <SocialAuth />
          </div>
          <div className="foot-message">
            Dont have a Barefoot Nomad account? <a href="/">Sign up now!</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  localAuth: PropTypes.func.isRequired,
  socialAuth: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.object,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ loginReducer }) => ({
  user: loginReducer
});

export default connect(
  mapStateToProps,
  { localAuth, socialAuth }
)(LoginPage);
