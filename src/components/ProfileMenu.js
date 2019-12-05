/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from "react";

class ProfileMenu extends React.Component {
  goToProfile = () => {
    const { history, handlePane } = this.props;
    history.push('/profile');
    handlePane();
  }

  handleLogout = () =>{
    const { handlePane } = this.props;
    localStorage.removeItem("bareFootToken");
    window.location.href = '/login';
    handlePane();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes}>
        <div id="myModal" className="modal-profile-menu">
          <div className="modal-content effect1">
            <div className="modal-body">
              <div id="go-to-profile" className='profile-menu-item' onClick={this.goToProfile}>
                My Profile
              </div>
              <div id="log-out" className='profile-menu-item' onClick={this.handleLogout}>
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMenu;
