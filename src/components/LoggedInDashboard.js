/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function LoggedInDashboard({history}) {
    const handleLogout = () =>{
        localStorage.removeItem("bareFootToken");
        history.push('/login');
    };
    return(
        <div>
            <h6>User Logged In SuccessFully</h6>
            <button className='btn-sample' onClick={handleLogout} type="button">Log Out</button>
        </div>
    );
}

LoggedInDashboard.propTypes = {
    history: PropTypes.object.isRequired
  };

export default LoggedInDashboard;